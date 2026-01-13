"use client";

import { useState } from "react";

export default function AlertSettings({
  onChange,
}: {
  onChange: (settings: {
    riskThreshold: number;
    liquidationThreshold: number;
  }) => void;
}) {
  const [riskThreshold, setRiskThreshold] = useState(60);
  const [liquidationThreshold, setLiquidationThreshold] =
    useState(12);

  return (
    <div className="mt-10 rounded-xl bg-[#111827] border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Alert Thresholds
      </h3>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-400">
            Risk score alert (≥)
          </label>
          <input
            type="range"
            min={20}
            max={90}
            value={riskThreshold}
            onChange={(e) => {
              const value = Number(e.target.value);
              setRiskThreshold(value);
              onChange({
                riskThreshold: value,
                liquidationThreshold,
              });
            }}
            className="w-full mt-2"
          />
          <div className="text-sm mt-1">
            {riskThreshold}/100
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">
            Liquidation time alert (≤ hours)
          </label>
          <input
            type="range"
            min={3}
            max={48}
            value={liquidationThreshold}
            onChange={(e) => {
              const value = Number(e.target.value);
              setLiquidationThreshold(value);
              onChange({
                riskThreshold,
                liquidationThreshold: value,
              });
            }}
            className="w-full mt-2"
          />
          <div className="text-sm mt-1">
            {liquidationThreshold}h
          </div>
        </div>
      </div>
    </div>
  );
}
