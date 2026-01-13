export type AlertLevel = "INFO" | "WARNING" | "CRITICAL";

export type Alert = {
  id: string;
  level: AlertLevel;
  message: string;
};

export function evaluateAlerts(input: {
  riskScore: number;
  timeToLiquidation: number;
  riskThreshold: number;
  liquidationThreshold: number;
}): Alert[] {
  const alerts: Alert[] = [];

  if (input.riskScore >= input.riskThreshold) {
    alerts.push({
      id: "risk-score",
      level:
        input.riskScore >= input.riskThreshold + 15
          ? "CRITICAL"
          : "WARNING",
      message: `Risk score is ${input.riskScore}, above your threshold (${input.riskThreshold}).`,
    });
  }

  if (
    input.timeToLiquidation <= input.liquidationThreshold
  ) {
    alerts.push({
      id: "liquidation-time",
      level:
        input.timeToLiquidation <=
        Math.max(3, input.liquidationThreshold / 2)
          ? "CRITICAL"
          : "WARNING",
      message: `Estimated liquidation in ~${input.timeToLiquidation}h.`,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: "ok",
      level: "INFO",
      message: "No alerts triggered. Position within safe limits.",
    });
  }

  return alerts;
}
