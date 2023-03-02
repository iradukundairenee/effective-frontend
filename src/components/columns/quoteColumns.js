import React, { useEffect } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";
import moment from "moment";
import { getQuotes } from "redux/actions/quote";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const statusStyles = (item) => {
  if (item.status === "Delivered") {
    return {
      background: "rgba(47, 186, 86, 0.2)",
      color: "#2FBA56",
      borderRadius: "15px",
      textAlign: "center",
    };
  } else if (item.status === "Expired") {
    return {
      background: "rgba(247, 107, 28, 0.2)",
      borderRadius: "15px",
      textAlign: "center",
      color: "#F76B1C",
    };
  } else if (item.status === "Accepted") {
    return {
      background: "rgba(28, 89, 247, 0.2)",
      borderRadius: "15px",
      textAlign: "center",
      color: "#1C59F7",
    };
  } else if (item.status === "Declined") {
    return {
      background: "rgba(254, 0, 0, 0.2)",
      borderRadius: "15px",
      textAlign: "center",
      color: "#FE0000",
    };
  }
  return {
    background: "rgba(254, 183, 0, 0.2)",
    borderRadius: "15px",
    textAlign: "center",
    color: "#FEB700",
  };
};

export const QuoteColumns = () => {
  const quoteState = useSelector((state) => state);
  const {
    quotesGet: { quotes },
    login: {
      userInfo: { user },
    },
  } = quoteState;

  useEffect(() => {
    getQuotes({});
  }, []);
  useEffect(() => {
    const clientQuotes = quotes.filter((quote) => quote.status !== "Draft");
    user.role !== "Client"
      ? quotes.forEach((quote, index) => (quote.serial = index + 1))
      : clientQuotes.forEach((quote, index) => (quote.serial = index + 1));
  }, [quotes, user]);

  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          0{item.serial}
        </Typography>
      ),
      label: "S.No",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.project?.name}
        </Typography>
      ),
      label: "Project",
    },
    user.role !== "Client" && {
      content: (item) => (
        <Grid
          style={{ display: "flex", alignItems: "center", padding: "10px 0px" }}
        >
          <Avatar
            src={
              item.user?.profileImage
                ? item.user?.profileImage
                : ""
            }
            alt="profile"
            style={{ width: "30px", height: "30px" }}
          />
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
              paddingLeft: "10px",
            }}
          >
            {item.user?.fullName}
          </Typography>
        </Grid>
      ),
      label: "Name",
    },
    user.role !== "Client" && {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.user?.companyName}
        </Typography>
      ),
      label: "Company Name",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.project?.type}
        </Typography>
      ),
      label: "Type",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {moment(item.createdAt).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Created",
    },
    user.role !== "Client" && {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {moment(item.expiryDate).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Due Date",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.billingCycle}
        </Typography>
      ),
      label: "Billing",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.user?.currency?.icon} {(item.amounts.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Typography>
      ),
      label: "Amount",
    },
    {
      content: (item) => (
        <Typography style={statusStyles(item)}>{item.status}</Typography>
      ),
      label: "Status",
    },
    {
      content: (item) => (
        <ButtonGroup variant="outlined" size="large">
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              component={Link}
              to={`/dashboard/quotes/${item._id}`}
              size="large"
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "24px",
              }}
            >
              <FiEye />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      ),
      label: "Actions",
    },
  ];
};
