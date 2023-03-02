import React, { useEffect } from "react";
import { Typography, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCurrency } from "../../redux/actions/currency";

import { BiPencil } from "react-icons/bi";

export const CurrencyColumns = () => {
  const appState = useSelector((state) => state);

  const {
    getCurrencies: { currencies },
    countCurrency: { count },
  } = appState;

  useEffect(() => {
    if (currencies)
      currencies.forEach((currency, index) => (currency.serial = index + 1));
  }, [currencies]);
  useEffect(() => {
    getAllCurrency();
  }, []);

  return [
    {
      content: (item) => {
        return (
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
        );
      },
      label: "S.No.",
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
          {item.currencyName}
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
          {item.icon}
        </Typography>
      ),
      label: "Icon",
    },
    {
      content: (item) => {
        return (
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            {count}
          </Typography>
        );
      },
      label: "Clients",
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
          {item.country}
        </Typography>
      ),
      label: "Country",
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
          {item.currencyCode}
        </Typography>
      ),
      label: "Currency Code",
    },
    {
      content: (item) => (
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit"
            component={Link}
            to={`/dashboard/currencies/updateCurrency/${item._id}`}
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
      ),
      label: "Action",
    },
  ];
};
