"use client";

import { simulatePriceDrop } from "../../lib/riskEngine";

const baseInput = {
  healthFactor: 1.45,
  collateralRatio: 138,
  volatility: 42,
};

const scenarios = [5, 10, 20];

export default function WhatIfSimulation() {
  const results = scenarios.map((drop) =>
    simulatePriceDrop(baseInput, drop)
  );

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

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="text-left py-2">Price Drop</th>
            <th className="text-left py-2">Risk Level</th>
            <th className="text-left py-2">Risk Score</th>
            <th className="text-left py-2">
              Time to Liquidation
            </th>
          </tr>
        </thead>

        <tbody>
          {results.map((res) => (
            <tr
              key={res.priceDrop}
              className="border-b border-gray-800 last:border-0"
            >
              <td className="py-2">
                −{res.priceDrop}%
              </td>
              <td
                className={`py-2 font-semibold ${colorMap[res.riskLevel]}`}
              >
                {res.riskLevel}
              </td>
              <td className="py-2">
                {res.riskScore}/100
              </td>
              <td className="py-2">
                ~{res.timeToLiquidation}h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
