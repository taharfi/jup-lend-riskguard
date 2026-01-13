"use client";

import { useState } from "react";
import { simulatePriceDrop } from "../../lib/riskEngine";

const baseInput = {
  healthFactor: 1.45,
  collateralRatio: 138,
  volatility: 42,
};

export default function WhatIfSlider() {
  const [drop, setDrop] = useState(10);

  const result = simulatePriceDrop(baseInput, drop);

  const colorMap = {
    SAFE: "text-green-400",
    WARNING: "text-yellow-400",
    DANGER: "text-red-400",
  };

  return (
    <div className="mt-10 rounded-xl bg-[#111827] border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        What-If Price Drop Simulation
      </h3>

      {/* Slider */}
      <div className="mb-6">
        <label className="text-sm text-gray-400">
          Price drop: <span className="font-semibold">{drop}%</span>
        </label>

        <input
          type="range"
          min={0}
          max={40}
          step={1}
          value={drop}
          onChange={(e) => setDrop(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Risk Level</p>
          <p
            className={`font-semibold ${colorMap[result.riskLevel]}`}
          >
            {result.riskLevel}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Risk Score</p>
          <p className="font-semibold">
            {result.riskScore}/100
          </p>
        </div>

        <div>
          <p className="text-gray-400">Time to liquidation</p>
          <p className="font-semibold">
            ~{result.timeToLiquidation}h
          </p>
        </div>
      </div>
    </div>
  );
}
