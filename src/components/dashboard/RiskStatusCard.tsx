"use client";

import {
  evaluateRisk,
  estimateTimeToLiquidation,
  generateRecommendations,
} from "../../lib/riskEngine";

const mockInput = {
  healthFactor: 1.45,
  collateralRatio: 138,
  volatility: 42,
};

export default function RiskStatusCard() {
  const risk = evaluateRisk(mockInput);

  const ttl = estimateTimeToLiquidation(
    mockInput.healthFactor,
    risk.score,
    mockInput.volatility
  );

  const recommendations = generateRecommendations(
    mockInput.healthFactor,
    mockInput.collateralRatio,
    risk.score,
    mockInput.volatility
  );

  const colorMap = {
    SAFE: "border-green-500 text-green-400",
    WARNING: "border-yellow-500 text-yellow-400",
    DANGER: "border-red-500 text-red-400",
  };

  return (
    <div
      className={`mt-10 rounded-xl bg-[#111827] border p-6 ${colorMap[risk.level]}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">
          Risk Status: {risk.level}
        </h3>
        <span className="text-xl font-bold">
          {risk.score}/100
        </span>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-300 mb-4">
        {risk.message}
      </p>

      {/* Progress Bar */}
      <div className="h-2 rounded bg-gray-800 overflow-hidden">
        <div
          className="h-full bg-current transition-all"
          style={{ width: `${risk.score}%` }}
        />
      </div>

      {/* Time to liquidation */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">
          Estimated time to liquidation
        </span>
        <span className="font-semibold">
          ~{ttl.hours}h ({ttl.label})
        </span>
      </div>

      {/* Metrics */}
      <div className="mt-4 text-xs text-gray-400">
        <p>Health Factor: {mockInput.healthFactor}</p>
        <p>Collateral Ratio: {mockInput.collateralRatio}%</p>
        <p>Market Volatility: {mockInput.volatility}</p>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2 text-gray-300">
          Recommended Actions
        </h4>

        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="text-sm flex items-start gap-2"
            >
              <span
                className={`mt-1 h-2 w-2 rounded-full ${
                  rec.severity === "HIGH"
                    ? "bg-red-500"
                    : rec.severity === "MEDIUM"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />
              <span className="text-gray-300">
                {rec.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
