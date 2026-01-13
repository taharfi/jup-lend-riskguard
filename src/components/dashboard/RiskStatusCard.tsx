interface RiskStatusCardProps {
  score: number;
  level: "safe" | "warning" | "critical";
}

export default function RiskStatusCard({
  score,
  level,
}: RiskStatusCardProps) {
  const color =
    level === "safe"
      ? "bg-green-500/10 text-green-400"
      : level === "warning"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-red-500/10 text-red-400";

  const label =
    level === "safe"
      ? "Safe"
      : level === "warning"
      ? "Warning"
      : "Critical";

  return (
    <div className={`rounded-xl p-6 border ${color}`}>
      <p className="text-sm opacity-70 mb-1">Risk Score</p>

      {/* 🔒 NaN-safe rendering */}
      <p className="text-4xl font-bold">
        {Number.isFinite(score) ? score : "--"}
      </p>

      <p className="mt-2 font-semibold">{label}</p>
    </div>
  );
}
