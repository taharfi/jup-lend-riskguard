"use client";

import { useState } from "react";

import { calculateRiskScore, getRiskLevel } from "../lib/riskScore";
import WalletImport from "../components/WalletImport";
import { Position } from "@/types/position";

import DashboardLayout from "../components/layout/DashboardLayout";
import OverviewGrid from "../components/dashboard/OverviewGrid";
import AnalyticsGrid from "../components/dashboard/AnalyticsGrid";
import RiskStatusCard from "../components/dashboard/RiskStatusCard";
import WhatIfSlider from "../components/dashboard/WhatIfSlider";
import RiskExplanation from "../components/dashboard/RiskExplanation";

import AlertSettings from "../components/dashboard/AlertSettings";
import AlertsPanel from "../components/dashboard/AlertsPanel";

import { evaluateRisk, estimateTimeToLiquidation } from "../lib/riskEngine";
import { evaluateAlerts } from "../lib/alertEngine";

/**
 * MOCK INPUT (Simulation Mode)
 */
const mockInput = {
  healthFactor: 1.45,
  collateralRatio: 138,
  volatility: 42,
};

export default function HomePage() {
  /** --------------------
   * MODE STATE
   * ------------------- */
  const [mode, setMode] = useState<"simulation" | "live">("simulation");

  /** --------------------
   * LIVE POSITION (Wallet)
   * ------------------- */
  const [livePosition, setLivePosition] = useState<Position | null>(null);

  /** --------------------
   * SIMULATED POSITION (CANONICAL)
   * ------------------- */
  const simulatedPosition: Position = {
    protocol: "jupiter",
    collateralUSD: 12500,
    debtUSD: 7200,
    ltv: 7200 / 12500,
    healthFactor: mockInput.healthFactor,
    liquidationPrice: 18.5,
    assets: [],
  };

  /** --------------------
   * ACTIVE POSITION (SINGLE SOURCE OF TRUTH)
   * ------------------- */
  const activePosition =
    mode === "live" && livePosition
      ? livePosition
      : simulatedPosition;

  /** --------------------
   * Risk engine input (legacy engine)
   * ------------------- */
  const riskInput = {
    healthFactor: activePosition.healthFactor,
    collateralRatio:
      (activePosition.collateralUSD / activePosition.debtUSD) * 100,
    volatility: 42,
  };

  /** --------------------
   * Risk evaluation (existing engine)
   * ------------------- */
  const risk = evaluateRisk(riskInput);

  const ttl = estimateTimeToLiquidation(
    riskInput.healthFactor,
    risk.score,
    riskInput.volatility
  );

  /** --------------------
   * Risk score (NEW engine)
   * ------------------- */
  const riskScore = calculateRiskScore(activePosition);
  const riskLevel = getRiskLevel(riskScore);

  /** --------------------
   * Alert settings
   * ------------------- */
  const [alertSettings, setAlertSettings] = useState({
    riskThreshold: 60,
    liquidationThreshold: 12,
  });

  /** --------------------
   * Alert evaluation
   * ------------------- */
  const alerts = evaluateAlerts({
    riskScore: riskScore,
    timeToLiquidation: ttl.hours,
    riskThreshold: alertSettings.riskThreshold,
    liquidationThreshold: alertSettings.liquidationThreshold,
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          JUPLEND Risk Overview
        </h2>

        <span className="text-xs px-3 py-1 rounded bg-white/10">
          {mode === "live" ? "Live Mode" : "Simulation Mode"}
        </span>
      </div>

      {/* Wallet Import */}
      <div className="mb-6">
        <WalletImport
          onPositionLoaded={(position) => {
            setLivePosition(position);
            setMode("live");
          }}
        />
      </div>

      {/* Top stats */}
      <OverviewGrid />

      {/* Charts */}
      <AnalyticsGrid />

      {/* Core risk card */}
      <RiskStatusCard score={riskScore} level={riskLevel} />

      {/* Interactive simulation */}
      <WhatIfSlider disabled={mode === "live"} />

      {/* Risk explanation */}
      <RiskExplanation />

      {/* Alert configuration */}
      <AlertSettings onChange={setAlertSettings} />

      {/* Alerts */}
      <AlertsPanel alerts={alerts} />
    </DashboardLayout>
  );
}
