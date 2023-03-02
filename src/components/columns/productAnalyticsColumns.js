import React from "react";
import { Avatar, Typography, Link } from "@material-ui/core";
import { ICON_PATH } from "utils/constants";
import { BiPlusMedical } from "react-icons/bi";

export const productAnalyticsColumns = (
  onProductClick,
  getProductDuplicates
) => [
  {
    content: (item) => (
      <Typography style={{ display: "flex" }}>
        <Link
          component="button"
          underline="none"
          onClick={() => onProductClick(item, "preview")}
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            display: "flex",
          }}
        >
          <Avatar
            src={`${ICON_PATH}/${item.imageIcon}`}
            style={{ marginRight: "5px" }}
          ></Avatar>
          <Typography
            style={{
              marginTop: "7px",
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            {item.name}
          </Typography>
        </Link>
        {item.duplicate > 1 ? (
          <BiPlusMedical
            onClick={() => getProductDuplicates(item)}
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
    label: "3D Assets",
  },
  {
    content: () => (
      <Typography
        style={{
          color: "#7D7D7D",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "Poppins",
        }}
      >
        03
      </Typography>
    ),
    label: "Users",
  },
  {
    content: () => (
      <Typography
        style={{
          color: "#7D7D7D",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "Poppins",
        }}
      >
        06
      </Typography>
    ),
    label: "AR Users",
  },
  {
    content: () => (
      <Typography
        style={{
          color: "#7D7D7D",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "Poppins",
        }}
      >
        03
      </Typography>
    ),
    label: "Device by Users",
    subheader: "ios Android Desktop",
  },
  {
    content: () => (
      <Typography
        style={{
          color: "#7D7D7D",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "Poppins",
        }}
      >
        03
      </Typography>
    ),
    label: "Device by Users",
    subheader: "ios Android Desktop",
  },
];
