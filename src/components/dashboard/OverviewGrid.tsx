import StatCard from "../ui/StatCard";

export default function OverviewGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <StatCard
        title="Protocol Health"
        value="Healthy"
        subtitle="Low systemic risk"
      />
      <StatCard title="Total Value Locked" value="$1.42B" />
      <StatCard title="Avg Health Factor" value="1.86" />
      <StatCard title="Liquidation Risk" value="Low" />
    </div>
  );
}

