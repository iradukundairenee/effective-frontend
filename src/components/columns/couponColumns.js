import React, { useEffect } from "react";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { BiPencil } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";

export const CouponColumns = () => {
  const couponState = useSelector((state) => state);
  const {
    getAllCoupons: { coupons },
  } = couponState;

  useEffect(() => {
    if (coupons) coupons.forEach((coupon, idx) => (coupon.serial = idx + 1));
  }, [coupons]);
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
          {item.couponName}
        </Typography>
      ),
      label: "Coupon Name",
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
          {item.couponCode}
        </Typography>
      ),
      label: "Coupon Code",
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
          {item.couponType}
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
          {moment(item.startDate).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Start Date",
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
          {moment(item.validity).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Validity",
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
          {item.currencyType && item.currencyType.currencyCode}
        </Typography>
      ),
      label: "Currency",
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
          {item.status ? item.status : "no status"}
        </Typography>
      ),
      label: "Status",
    },
    {
      content: (item) => (
        <Grid>
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              component={Link}
              size="large"
              to={`/dashboard/coupons/view/${item._id}`}
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
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              component={Link}
              to={`/dashboard/coupons/update/${item._id}`}
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
