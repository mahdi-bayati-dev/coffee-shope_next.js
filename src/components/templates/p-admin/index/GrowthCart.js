"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function GrowthCart() {
  const data = [
    { name: "04/1", sales: 400, lastYear: 300 },
    { name: "04/2", sales: 300, lastYear: 250 },
    { name: "04/3", sales: 500, lastYear: 400 },
    { name: "04/4", sales: 200, lastYear: 280 },
    { name: "04/5", sales: 270, lastYear: 260 },
    { name: "04/6", sales: 600, lastYear: 320 },
    { name: "04/7", sales: 100, lastYear: 220 },
    { name: "04/8", sales: 500, lastYear: 350 },
    { name: "04/9", sales: 800, lastYear: 420 },
    { name: "04/10", sales: 900, lastYear: 500 },
    { name: "04/11", sales: 1000, lastYear: 650 },
    { name: "04/12", sales: 700, lastYear: 600 },
    { name: "04/13", sales: 750, lastYear: 620 },
    { name: "04/14", sales: 850, lastYear: 700 },
    { name: "04/15", sales: 970, lastYear: 780 },
    { name: "04/16", sales: 1100, lastYear: 800 },
    { name: "04/17", sales: 1200, lastYear: 950 },
    { name: "04/18", sales: 900, lastYear: 880 },
    { name: "04/19", sales: 1050, lastYear: 910 },
    { name: "04/20", sales: 1150, lastYear: 940 },
  ];

  return (
    <ResponsiveContainer width="100%" height="92%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* خط امسال */}
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#711d1c"
          strokeWidth={2}
          name="امسال"
        />
        {/* خط سال قبل */}
        <Line
          type="monotone"
          dataKey="lastYear"
          stroke="#8884d8"
          strokeWidth={2}
          name="سال قبل"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
