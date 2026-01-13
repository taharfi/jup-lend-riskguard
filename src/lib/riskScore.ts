import { Position } from "../types/position";


/**
 * Risk levels returned by the engine
 */
export type RiskLevel = "safe" | "warning" | "critical";

/**
 * Calculate a unified risk score (0–100)
 * Higher = safer
 */
export function calculateRiskScore(position: Position): number {
  // Health Factor contribution (40%)
  const hfNormalized = Math.min(position.healthFactor / 2, 1);
  const hfScore = hfNormalized * 40;

  // LTV buffer contribution (30%)
  const ltvBuffer = Math.max(0, 1 - position.ltv);
  const ltvScore = ltvBuffer * 30;

  // Debt pressure contribution (20%)
  const debtRatio =
    position.collateralUSD > 0
      ? position.debtUSD / position.collateralUSD
      : 1;

  const debtScore = Math.max(0, 1 - debtRatio) * 20;

  // Liquidation info availability (10%)
  const liquidationScore = position.liquidationPrice ? 10 : 5;

  const totalScore =
    hfScore +
    ltvScore +
    debtScore +
    liquidationScore;

  return Math.round(Math.min(100, Math.max(0, totalScore)));
}

/**
 * Map score to qualitative risk level
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return "safe";
  if (score >= 50) return "warning";
  return "critical";
}
