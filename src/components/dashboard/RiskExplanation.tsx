"use client";

import { explainRisk } from "../../lib/riskEngine";

const mockInput = {
  healthFactor: 1.45,
  collateralRatio: 138,
  volatility: 42,
};

export default function RiskExplanation() {
  const explanations = explainRisk(mockInput);

  return (
    <div className="mt-10 rounded-xl bg-[#111827] border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Why your risk looks like this
      </h3>

      <div className="space-y-4">
        {explanations.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">
                {exp.factor}
              </span>
              <span className="font-semibold">
                {exp.contribution}%
              </span>
            </div>

            <div className="h-2 rounded bg-gray-800 overflow-hidden mb-1">
              <div
                className="h-full bg-cyan-400"
                style={{
                  width: `${exp.contribution}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-400">
              {exp.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
