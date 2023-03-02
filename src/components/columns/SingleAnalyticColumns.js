import React, { useEffect,useState} from "react";
import {
  Typography,
  Link,
  Avatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiPlusMedical } from "react-icons/bi";
import { ICON_PATH } from "utils/constants";
import { useHistory } from "react-router-dom";
import { getSingleAnalytic} from "redux/actions/product";

export const SingleAnalyticsColumns = () => {
  

 
  const currentDate = moment();



  const appState = useSelector((state) => state);
  const {
    getSingleAnalytic: { singleAnalytic },
    login: {
      userInfo: { user },
    },
  } = appState;
  useEffect(() => {
    singleAnalytic.forEach((single, index) => (single.serial = index + 1));
  }, [singleAnalytic]);

  return [
    {
      content: (item) => (
        <Typography style={{ display: "flex" }}>
         
        </Typography>
      ),
    },
    {
      content: (item) => (
        <Typography style={{ display: "flex",color: "#7D7D7D",
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: "16px", }}>
         0{item.serial}
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
              Yes
        </Typography>
      )
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
          {item.device}
        </Typography>
      )
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
          {currentDate.diff(moment(item.createdAt), 'hours')}hours
        </Typography>
      )
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
          {moment(item.createdAt).format("DD MMM YYYY, hh:mm a")}
        </Typography>
      )
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
         {item.city}
        </Typography>
      )
    },
    


  ];
};
