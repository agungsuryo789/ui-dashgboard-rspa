import React, { Fragment, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  Bar,
} from "recharts";
import fetch from "node-fetch";

import { baseUrl } from "../api";
import Title from "./Title";

export default function Chart() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/menikah`);
    const body = await response.text();
    const respData = JSON.parse(body);

    let total = respData.filter((item) => !item.StatusMaritalName);
    let totalMenikah = total ? total[0].jumlah : 0;
    let mappedData = respData
      .filter((item) => item.StatusMaritalName)
      .map((data) => {
        return {
          name: data.StatusMaritalName,
          jumlah: data.jumlah,
        };
      });

    setTotalData(totalMenikah);
    setData(mappedData);
  };

  return (
    <React.Fragment>
      <Title>Data Jumlah Menikah</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h4>Jumlah Data: {totalData}</h4>
    </React.Fragment>
  );
}
