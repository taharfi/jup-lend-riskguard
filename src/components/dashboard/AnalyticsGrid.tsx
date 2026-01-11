import RiskTrendChart from "./RiskTrendChart";
import TpsChart from "./TpsChart";

export default function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <RiskTrendChart />
      <TpsChart />
    </div>
  );
}
