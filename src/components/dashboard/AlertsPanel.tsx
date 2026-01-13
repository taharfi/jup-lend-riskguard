"use client";

import { Alert } from "../../lib/alertEngine";

export default function AlertsPanel({
  alerts,
}: {
  alerts: Alert[];
}) {
  const colorMap = {
    INFO: "border-gray-600 text-gray-300",
    WARNING: "border-yellow-500 text-yellow-400",
    CRITICAL: "border-red-500 text-red-400",
  };

  return (
    <div className="mt-10 space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 bg-[#111827] ${colorMap[alert.level]}`}
        >
          <div className="font-semibold">
            {alert.level}
          </div>
          <div className="text-sm">
            {alert.message}
          </div>
        </div>
      ))}
    </div>
  );
}
