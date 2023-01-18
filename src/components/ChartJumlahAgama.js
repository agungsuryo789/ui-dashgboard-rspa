import React, { Fragment, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import fetch from "node-fetch";

import { baseUrl } from "../api";
import Title from "./Title";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  AgamaName,
  jumlah
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${AgamaName} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DonutChart() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/agama`);
    const body = await response.text();
    const respData = JSON.parse(body);

    let totalData = respData.filter((item) => !item.AgamaName);
    let mappedData = respData.filter((item) => item.AgamaName);
    let totalAgama = totalData ? totalData[0].jumlah : 0;

    setData(mappedData);
    setTotalData(totalAgama);
  };

  return (
    <Fragment>
      <Title>Data Jumlah Agama</Title>
      <ResponsiveContainer>
        <PieChart width={730} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="jumlah"
            nameKey="AgamaName"
            outerRadius={120}
            fill="#82ca9d"
            label={renderCustomizedLabel}
			labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <h4>Jumlah Data: {totalData}</h4>
    </Fragment>
  );
}
