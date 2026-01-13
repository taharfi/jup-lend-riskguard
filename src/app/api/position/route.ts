import { NextResponse } from "next/server";
import { Position } from "../../../types/position";


/**
 * GET /api/position?wallet=...
 * Temporary mock implementation
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  // 🔹 MOCK POSITION (replace later with real fetcher)
  const mockPosition: Position = {
    protocol: "jupiter",

    collateralUSD: 12500,
    debtUSD: 7200,

    ltv: 7200 / 12500,
    healthFactor: 1.42,
    liquidationPrice: 18.5,

    assets: [
      {
        symbol: "SOL",
        collateralUSD: 9500,
        debtUSD: 0,
      },
      {
        symbol: "USDC",
        collateralUSD: 3000,
        debtUSD: 7200,
      },
    ],
  };

  return NextResponse.json(mockPosition);
}
