export type RiskLevel = "SAFE" | "WARNING" | "DANGER";

type RiskInput = {
  healthFactor: number;
  collateralRatio: number;
  volatility: number; // 0–100
};

export type RiskResult = {
  level: RiskLevel;
  score: number; // 0–100
  message: string;
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function evaluateRisk(input: RiskInput): RiskResult {
  const { healthFactor, collateralRatio, volatility } = input;

  // Normalize factors to 0–100 risk contribution
  const hfRisk = clamp((2 - healthFactor) * 50); // HF < 2 increases risk
  const collateralRisk = clamp((180 - collateralRatio) * 0.5);
  const volatilityRisk = clamp(volatility);

  // Weighted score
  const score = clamp(
    hfRisk * 0.5 +
      collateralRisk * 0.3 +
      volatilityRisk * 0.2
  );

  let level: RiskLevel = "SAFE";
  let message = "Position healthy. No immediate risk detected.";

  if (score > 65) {
    level = "DANGER";
    message = "High liquidation risk. Immediate action recommended.";
  } else if (score > 35) {
    level = "WARNING";
    message = "Risk increasing. Monitor closely.";
  }

  return {
    level,
    score: Math.round(score),
    message,
  };
}
export function estimateTimeToLiquidation(
  healthFactor: number,
  riskScore: number,
  volatility: number
): {
  hours: number;
  label: string;
} {
  // Base time decreases as risk increases
  let hours = 72;

  hours -= riskScore * 0.6;
  hours -= volatility * 0.3;

  // Health factor buffer
  if (healthFactor < 1.4) hours -= 12;
  if (healthFactor < 1.2) hours -= 24;

  hours = Math.max(1, Math.round(hours));

  let label = "Low urgency";
  if (hours < 48) label = "Monitor closely";
  if (hours < 24) label = "Action recommended";
  if (hours < 6) label = "Critical";

  return { hours, label };
}
export type Recommendation = {
  type: "ADD_COLLATERAL" | "REDUCE_BORROW" | "VOLATILITY_WARNING";
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
};

export function generateRecommendations(
  healthFactor: number,
  collateralRatio: number,
  riskScore: number,
  volatility: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (healthFactor < 1.6) {
    recommendations.push({
      type: "ADD_COLLATERAL",
      severity: healthFactor < 1.3 ? "HIGH" : "MEDIUM",
      message:
        "Add collateral to increase your health factor and reduce liquidation risk.",
    });
  }

  if (collateralRatio < 150) {
    recommendations.push({
      type: "REDUCE_BORROW",
      severity: collateralRatio < 130 ? "HIGH" : "MEDIUM",
      message:
        "Reduce borrowed amount to improve collateral ratio.",
    });
  }

  if (volatility > 50) {
    recommendations.push({
      type: "VOLATILITY_WARNING",
      severity: volatility > 70 ? "HIGH" : "LOW",
      message:
        "High market volatility detected. Risk may increase rapidly.",
    });
  }

  if (riskScore < 30) {
    recommendations.push({
      type: "VOLATILITY_WARNING",
      severity: "LOW",
      message:
        "Position is healthy. No immediate action required.",
    });
  }

  return recommendations;
}
export type SimulationResult = {
  priceDrop: number; // %
  riskLevel: RiskLevel;
  riskScore: number;
  timeToLiquidation: number; // hours
};

export function simulatePriceDrop(
  base: {
    healthFactor: number;
    collateralRatio: number;
    volatility: number;
  },
  dropPercent: number
): SimulationResult {
  // Simulate impact
  const newCollateralRatio =
    base.collateralRatio * (1 - dropPercent / 100);

  const newHealthFactor =
    base.healthFactor * (1 - dropPercent / 150);

  const newVolatility = Math.min(
    100,
    base.volatility + dropPercent * 0.8
  );

  const risk = evaluateRisk({
    healthFactor: newHealthFactor,
    collateralRatio: newCollateralRatio,
    volatility: newVolatility,
  });

  const ttl = estimateTimeToLiquidation(
    newHealthFactor,
    risk.score,
    newVolatility
  );

  return {
    priceDrop: dropPercent,
    riskLevel: risk.level,
    riskScore: risk.score,
    timeToLiquidation: ttl.hours,
  };
}
