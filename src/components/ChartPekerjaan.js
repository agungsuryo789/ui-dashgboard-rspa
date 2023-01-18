import React, { Fragment, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  XAxis,
  YAxis,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import fetch from "node-fetch";
import Title from "./Title";
import { baseUrl } from "../api";

export default function ChartPekerjaan() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/pekerjaan`);
    const body = await response.text();
    const respData = JSON.parse(body);

    let total = respData.filter((item) => !item.PekerjaanName);
    let totalAmmount = total ? total[0].jumlah : 0;
    let mappedData = respData.filter((item) => item.PekerjaanName).map((data) => {
      return {
        name: data.PekerjaanName,
        jumlah: data.jumlah,
      };
    });

    setTotalData(totalAmmount);
    setData(mappedData);
  };

  return (
    <React.Fragment>
      <Title>Data Jumlah Pekerjaan</Title>
	  <h4>Jumlah Data: {totalData}</h4>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
	  
    </React.Fragment>
  );
}
