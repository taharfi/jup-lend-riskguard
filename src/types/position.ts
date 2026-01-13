// types/position.ts

export type Protocol = "jupiter" | "solend" | "marginfi";

export interface AssetPosition {
  symbol: string;
  collateralUSD: number;
  debtUSD: number;
}

export interface Position {
  protocol: Protocol;

  // totals
  collateralUSD: number;
  debtUSD: number;

  // core risk metrics
  ltv: number;            // debt / collateral
  healthFactor: number;   // protocol-defined or computed
  liquidationPrice?: number;

  // breakdown
  assets: AssetPosition[];
}
