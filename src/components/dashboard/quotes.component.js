import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const TotalQuotes = ({ counts }) => (
  <Card>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL PROPOSALS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {counts}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56,
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      ></Box>
    </CardContent>
  </Card>
);

export default TotalQuotes;
