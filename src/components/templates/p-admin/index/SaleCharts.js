"use client";

import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

export default function SaleCharts() {
  const data = [
    { name: "04/1/15", sales: 400 , },
    { name: "04/2/15", sales: 300 , },
    { name: "04/3/15", sales: 500 , },
    { name: "04/4/15", sales: 200,  },
    { name: "04/5/15", sales: 270,  },
    { name: "04/6/15", sales: 600 , },
    { name: "04/7/15", sales: 100 , },
    { name: "04/8/15", sales: 500 , },
    { name: "04/9/15", sales: 800 , },
    { name: "04/10/15", sales: 900 , },
    { name: "04/11/15", sales: 1000 , },
    { name: "04/12/15", sales: 700 , },
  ];

  return (
    <ResponsiveContainer width="100%" height="92%">
      <AreaChart width={500} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#000" fill="#711d1c" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
