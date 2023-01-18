import React, { Fragment, useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import fetch from "node-fetch";

import { baseUrl } from "../api";
import Title from "./Title";

export default function ChartUmur() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/umur`);
    const body = await response.text();
    const respData = JSON.parse(body);

    // let mappedData = respData.map((data) => {
    //   return {
    //     name: data.PekerjaanName,
    //     jumlah: data.jumlah,
    //   };
    // });
    let respObj = respData ? respData[0] : null;
    let mappedData = Object.keys(respObj).map((key) => {
      var rand =
        "rgb(" +
        (Math.floor((256 - 199) * Math.random()) + 50) +
        "," +
        (Math.floor((256 - 199) * Math.random()) + 50) +
        "," +
        (Math.floor((256 - 199) * Math.random()) + 50) +
        ")";
      return {
        name: key,
        jumlah: respObj[key],
        fill: `${rand}`,
      };
    });

    setData(mappedData);
    console.log("respData", mappedData);
  };

  return (
    <Fragment>
      <Title>Data Umur</Title>
      <ResponsiveContainer>
        <RadialBarChart
          width={730}
          height={250}
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ fill: "#666", position: "insideStart" }}
            background
            clockWise={true}
            dataKey="jumlah"
          />
          <Legend
		  	id="legendRadialChart"
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </Fragment>
  );
}
