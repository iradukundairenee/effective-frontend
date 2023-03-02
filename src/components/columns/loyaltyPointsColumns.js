import React, { useEffect } from "react";
import moment from "moment";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiPencil } from "react-icons/bi";

export const LoyaltyPointsColumns = () => {
  const loyaltyPointsState = useSelector((state) => state);

  const {
    loyaltyPointsGet: { loyaltyPoints },
  } = loyaltyPointsState;

  useEffect(() => {
    loyaltyPoints.forEach((points, index) => (points.serial = index + 1));
  });

  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          0{item.serial}
        </Typography>
      ),
      label: "S.NO",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.name}
        </Typography>
      ),
      label: "Name",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.code}
        </Typography>
      ),
      label: "Code",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
            textAlign: "center",
          }}
        >
          {item.currencyType.currencyCode} {item.currencyType.icon}
        </Typography>
      ),
      label: "Type of Currency",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.purchasedAmount}
        </Typography>
      ),
      label: "Purchased amt",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.generatedPoints}
        </Typography>
      ),
      label: "Points gen",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
            textAlign: "center",
          }}
        >
          {item.rule &&
            item.rule.points + " = " + item.rule.value + item.currencyType.icon}
        </Typography>
      ),
      label: "Rule",
    },
    {
      content: (item) => (
        <Grid
          style={
            item.slab === "Disabled"
              ? {
                  background: "rgba(254, 183, 0, 0.2)",
                  borderRadius: "15px",
                  padding: "5px 15px",
                  width: "fit-content",
                }
              : {
                  background: "rgba(47, 186, 86, 0.2)",
                  borderRadius: "15px",
                  padding: "5px 15px",
                  width: "fit-content",
                }
          }
        >
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "15px",
            }}
          >
            {item.slab}
          </Typography>
        </Grid>
      ),
      label: "Slab",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
            textAlign: "center",
          }}
        >
          {item.slabPoints}
        </Typography>
      ),
      label: "Slab Points",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.slab === "Disabled"
            ? ""
            : moment(item.validity).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Validity",
    },
    {
      content: (item) => (
        <Grid>
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              component={Link}
              to={`/dashboard/loyaltypoints/update/${item._id}`}
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              <BiPencil />
            </IconButton>
          </Tooltip>
        </Grid>
      ),
    },
  ];
};
