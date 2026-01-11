"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "Mon", tps: 3100 },
  { time: "Tue", tps: 3400 },
  { time: "Wed", tps: 2900 },
  { time: "Thu", tps: 3600 },
  { time: "Fri", tps: 3800 },
  { time: "Sat", tps: 4000 },
  { time: "Sun", tps: 3900 },
];

export default function TpsChart() {
  return (
    <div className="mt-10 rounded-xl bg-[#111827] border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Network TPS (7d)
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="tps"
              stroke="#34d399"
              fill="#34d399"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
