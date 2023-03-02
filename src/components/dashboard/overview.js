import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { TbBox } from "react-icons/tb";
import { styles } from "./styles";
import { MdPeopleAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { getProducts } from "redux/actions/product";
import { getAssets } from "redux/actions/dashboard";

export const Overview = ({ counts, views, user }) => {
  const classes = styles();
  const [assetsCount, setAssetsCount] = useState();
  const [assetViews, setAssetViews] = useState();
  const [viewsCount, setViewsCount] = useState();
  const [monthlyViews, setMonthlyViews] = useState();

  useEffect(() => {
    if (counts) {
      setAssetsCount(
        counts.products.filter((product) => {
          return product?.project?.manager === user._id;
        }).length
      );
      setViewsCount(counts.viewCounts);
      setAssetViews(counts.viewCounts);
      setMonthlyViews(
        counts.viewCounts &&
          counts.viewCounts.filter((item) => {
            const end = new Date();
            const start = new Date(end.getFullYear(), end.getMonth(), 1);
            const date = new Date(item.createdAt);
            return date >= start && date <= end;
          }).length
      );
    }
  }, [counts, user._id, views]);

  return (
    <div className={classes.root}>
      <Card className={classes.rootContent}>
        <Typography
          style={{
            fontSize: "24px",
            fontWeight: "700",
            fontFamily: "Poppins",
            color: "#303030",
            marginTop: "25px",
            marginLeft: "30px",
          }}
        >
          Overview
        </Typography>
        <CardContent className={classes.content}>
          <Grid
            spacing={3}
            sx={{ justifyContent: "space-between" }}
            className={classes.cardContent}
          >
            <Grid item>
              <TbBox
                style={{
                  backgroundColor: "#8967FC",
                  width: "50px",
                  height: "50px",
                  marginRight: "20px",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h3"
                style={{ fontWeight: "bold" }}
              >
                {user.role === "Manager"
                  ? assetsCount
                  : counts && counts.products && counts.products.length}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="h5">
                Total 3D Assets
              </Typography>
            </Grid>
          </Grid>
          <Grid
            spacing={3}
            sx={{ justifyContent: "space-between" }}
            className={classes.cardContent}
          >
            <Grid item>
              <Avatar
                style={{
                  backgroundColor: "#8967FC",
                  width: "55px",
                  height: "55px",
                  marginRight: "20px",
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h3"
                style={{ fontWeight: "bold" }}
              >
                {monthlyViews}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="h5">
                Monthly Views
              </Typography>
            </Grid>
          </Grid>
          <Grid
            spacing={3}
            sx={{ justifyContent: "space-between" }}
            className={classes.cardContent}
          >
            <Grid item>
              <MdPeopleAlt
                style={{
                  backgroundColor: "#8967FC",
                  width: "50px",
                  height: "50px",
                  marginRight: "20px",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h3"
                style={{ fontWeight: "bold" }}
              >
                {user.role === "Manager"
                  ? viewsCount && viewsCount.length
                  : user.role === "Client"
                  ? assetViews && assetViews.length
                  : counts && counts.viewCounts.length}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="h5">
                Total Views
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
