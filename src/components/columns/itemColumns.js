import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

import { BiPencil } from "react-icons/bi";

export const ItemColumns = ({
  setItem,
  setIsOpen,
  setAction
}) => {

  const itemState = useSelector((state) => state);

  const {
    getItems: { items },
  } = itemState;

  useEffect(() => {
    items.forEach((currency, index) => (currency.serial = index + 1));
  }, [items]);

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
            {item.serial}
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
          {item.item}
        </Typography>
      ),
      label: "Item Name",
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
          {item.price}
        </Typography>
      ),
      label: "Price",
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
          {item.currency && item.currency.currencyName}
        </Typography>
      ),
      label: "Currency Name",
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
          {item.currency && item.currency.currencyCode}
        </Typography>
      ),
      label: "Currency Code",
    },
    {
      content: (item) => (
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit"
            onClick={() => {
              setItem(item)
              setIsOpen(true)
              return setAction('edit')
            }}
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
