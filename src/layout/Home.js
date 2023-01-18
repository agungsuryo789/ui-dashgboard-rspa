import * as React from "react";
import ChartJumlahAgama from "../components/ChartJumlahAgama";
import ChartMenikah from "../components/ChartMenikah";
import ChartPekerjaan from "../components/ChartPekerjaan";
import ChartUmur from "../components/ChartUmur";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 350,
            }}
          >
            <ChartUmur />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 350,
            }}
          >
            <ChartJumlahAgama />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 500,
            }}
          >
            <ChartMenikah />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 360,
            }}
          >
            <ChartPekerjaan />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
