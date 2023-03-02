import React from "react";
import Registration from "../components/dashboard/register.component";
import Users from "../components/dashboard/users.component";
import { Grid, Box } from "@material-ui/core";

export default function HomePage(props) {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Grid container spacing={1}>
        <Grid item lg={4} md={4} xl={6} xs={12}>
          <Registration />
        </Grid>
        <Grid item lg={8} md={8} xl={6} xs={12}>
          <Users />
        </Grid>
      </Grid>
    </Box>
  );
}
