import DashboardLayout from "../components/layout/DashboardLayout";
import OverviewGrid from "../components/dashboard/OverviewGrid";
import AnalyticsGrid from "../components/dashboard/AnalyticsGrid";
import RiskStatusCard from "../components/dashboard/RiskStatusCard";
import WhatIfSimulation from "../components/dashboard/WhatIfSimulation";

export default function HomePage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-white">
        JUPLEND Risk Overview
      </h2>

      <OverviewGrid />
      <AnalyticsGrid />
      <RiskStatusCard />
      <WhatIfSimulation />
    </DashboardLayout>
  );
}
