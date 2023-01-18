import * as React from "react";
import Orders from "../components/Orders";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function ReportsContent() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default function Reports() {
  return <ReportsContent />;
}
