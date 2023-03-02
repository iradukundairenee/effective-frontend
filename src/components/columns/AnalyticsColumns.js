import React from "react";
import { useSelector } from "react-redux";
import { ICON_PATH } from "utils/constants";
import { BiPlusMedical } from "react-icons/bi";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TableCell, Link, Avatar } from "@material-ui/core";

export const AnalyticsColumns = (
  onClickItem,
  getProductDuplicatesAnalytics,
  sortByStatus,
  sorted
) => {
  const appState = useSelector((state) => state);
  const {
    productDuplicates: { duplicates },
    productDuplicatesAnalytics: { duplicatesAnalytics },
  } = appState;

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "white",
      fontSize: 16,
      fontFamily: "Poppins",
    },
    body: {
      fontSize: 16,
      backgroundColor: "#fff",
      borderBottom: "none",
    },
  }))(TableCell);
  return [
    {
      content: (item) => (
        <Typography style={{ display: "flex", cursor: "pointer" }}>
          <Link
            component="button"
            underline="none"
            onClick={() => {
              alert("done well");
              return onClickItem(item, "preview");
            }}
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            <Avatar
              src={`${ICON_PATH}/${item.product && item.product.imageIcon}`}
              style={{ marginRight: "5px" }}
            ></Avatar>

            <Typography
              style={{
                marginTop: "7px",
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "16px",
                textDecoration: "underline",
              }}
            >
              {item.product && item.product.name}
            </Typography>
          </Link>
          {item.product.duplicate > 1 ? (
            <BiPlusMedical
              onClick={() => {
                return getProductDuplicatesAnalytics(item.product._id);
              }}
              style={{
                color: "#8967FC",
                marginLeft: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          ) : (
            ""
          )}
        </Typography>
      ),
      label: " 3D Assets",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.product.users}
        </Typography>
      ),
      label: "Users",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.product.clicks}
        </Typography>
      ),
      label: "A.R Users",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.product.iOs}
        </Typography>
      ),
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.product.androids}
        </Typography>
      ),
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.product.desktops}
        </Typography>
      ),
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          {item.countries &&
            item.countries.map((country) => {
              return <>0</>;
            })}
        </Typography>
      ),
    },
  ];
};
