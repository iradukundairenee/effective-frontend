import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import { viewCustomerSubscriptions } from "redux/actions/subscription";
import { getProduct } from "redux/actions/product";
import Box from "@mui/material/Box";
import { useStyles } from "styles/headerStyles";
import Modal from "@mui/material/Modal";
import { BiPencil } from "react-icons/bi";
import {
  getSubscriptions,
  getSubscription,
} from "redux/actions/subscriptionPlan";
import { FiEye, FiXSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { initialPaginate, paginate } from "utils/paginate";
import { deleteSubscription } from "../../redux/actions/subscriptionPlan";
import moment from "moment";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "3px",
};

export const CrmSubscriptionColumns = () => {
  const params = useParams();
  const { id } = params;
  const classes = useStyles();
  const subscriptionState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [mouseOver, setMouseOver] = useState(false);

  const {
    viewCustomersSubscription: { loading, customersub },
    login: {
      userInfo: { user },
    },
  } = subscriptionState;

  useEffect(() => {
    return viewCustomerSubscriptions(id);
  }, []);
  useEffect(() => {
    if (customersub.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(customersub, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [customersub, paginator]);

  useEffect(() => {
    customersub.forEach(
      (customersub, index) => (customersub.serial = index + 1)
    );
  }, [customersub]);

  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
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
            fontSize: "14px",
          }}
        >
          {item.subscriptionPlanId.SubscriptionPlanName &&
            item.subscriptionPlanId.SubscriptionPlanName}
        </Typography>
      ),
      label: "SubscriptionName",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {item.subscriptionPlanId.TypeSubscriptionPlan &&
            item.subscriptionPlanId.TypeSubscriptionPlan}
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
            fontSize: "14px",
          }}
        >
          {moment(item.startDate && item.startDate).format("DD MMM YYYY")}
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
            fontSize: "14px",
          }}
        >
          {moment(item.endDate && item.endDate).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Due Date",
    },
    {
      content: (item) => {
        return (
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {moment(item.endDate && item.endDate).format("DD MMM YYYY")}
          </Typography>
        );
      },
      label: "Expiry Date",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {item.subscriptionPlanId.Validity && item.subscriptionPlanId.Validity}
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
            fontSize: "14px",
          }}
        >
          {item.billingCycle && item.billingCycle}
        </Typography>
      ),
      label: "Usage",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {item.subscriptionPlanId.PayPerClickCharge &&
            item.subscriptionPlanId.PayPerClickCharge}
        </Typography>
      ),
      label: "Price",
    },
  ];
};
