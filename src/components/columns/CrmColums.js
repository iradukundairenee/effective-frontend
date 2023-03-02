import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import { getProjectListDetails } from "redux/actions/project";
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
import duplicate from "../../assets/duplicate-asset.svg";
import { initialPaginate, paginate } from "utils/paginate";
import { deleteSubscription } from "../../redux/actions/subscriptionPlan";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BiPlus, BiMinus } from "react-icons/bi";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

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

export const CrmColumns = (getProductDuplicates) => {
  const params = useParams();
  const { type, id } = params;
  const classes = useStyles();
  const projectState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [mouseOver, setMouseOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const {
    CustomerProjectList: { project },
    login: {
      userInfo: { user },
    },
  } = projectState;
  useEffect(() => {
    if (type === "user") return getProjectListDetails("user", id);
    return getProjectListDetails("manager", id);
  }, [id, type]);
  useEffect(() => {
    if (project.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(project, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [project, paginator]);

  useEffect(() => {
    project.forEach((project, index) => (project.serial = index + 1));
  }, [project]);

  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
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
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          {item.name}
        </Typography>
      ),
      label: "Project",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
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
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          {moment(item.dueDate).format("DD MMM YYYY")}
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
              position: "absolute",
              top: "1rem",
              bottom: "1rem",
            }}
          >
            {moment(item.dueDate).format("DD MMM YYYY")}
          </Typography>
        );
      },
      label: "Actual End Date",
    },
    {
      content: (item) => (
        <div style={{ display: "flex", paddingBottom: "1rem" }}>
          <div>
            {item.products.length &&
              (open &&
              selectedProduct === item.products[0].productDetails[0]._id ? (
                item.products.map((product) => (
                  <div
                    style={{
                      color: "#7D7D7D",
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    {product.productDetails.length &&
                      product.productDetails[0].name}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    color: "#7D7D7D",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {item.products[0].productDetails[0].name}
                </div>
              ))}
          </div>

          <div>
            {item.products.length > 1 &&
              (open &&
              selectedProduct === item.products[0].productDetails[0]._id ? (
                <BiMinus
                  onClick={() => {
                    return setOpen(false);
                  }}
                  style={{
                    color: "#8967FC",
                    marginLeft: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                />
              ) : (
                <BiPlus
                  onClick={() => {
                    setSelectedProduct(item.products[0].productDetails[0]._id);
                    return setOpen(true);
                  }}
                  style={{
                    color: "#8967FC",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                />
              ))}
          </div>
        </div>
      ),
      label: "Asset name",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          {item.budget?.toLocaleString("en-US")}
        </Typography>
      ),
      label: "Budget",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          {type === "user" && item.user && item.user.fullName}
          {type === "manager" && item.manager && item.manager.fullName}
        </Typography>
      ),
      label: "Assigned to",
    },
    {
      content: (item) => (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <ul
            style={{
              display: "block",
              listStyleType: "none",
              marginTop: "10px",
              position: "relative",
            }}
          >
            {item.products.length &&
              (open &&
              selectedProduct === item.products[0]?.productDetails[0]?._id ? (
                item.products.map((product) => (
                  <li
                    style={
                      item.status === "approved"
                        ? {
                            background: "rgba(47, 186, 86, 0.2)",
                            color: "#2FBA56",
                            borderRadius: "15px",
                            textAlign: "center",
                          }
                        : {
                            background: "rgba(254, 183, 0, 0.2)",
                            borderRadius: "25px",
                            textAlign: "center",
                            color: "#FEB700",
                          }
                    }
                  >
                    {product.productDetails.length &&
                      product.productDetails[0]?.status}
                  </li>
                ))
              ) : (
                <li
                  style={
                    item.status === "approved"
                      ? {
                          background: "rgba(47, 186, 86, 0.2)",
                          color: "#2FBA56",
                          borderRadius: "15px",
                          textAlign: "center",
                          padding: "5px 15px",
                        }
                      : {
                          background: "rgba(254, 183, 0, 0.2)",
                          borderRadius: "15px",
                          textAlign: "center",
                          color: "#FEB700",
                          padding: "5px 15px",
                        }
                  }
                >
                  {item.products[0]?.productDetails[0]?.status}
                </li>
              ))}
          </ul>
        </div>
      ),
      label: "Asset Status",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "14px",
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          {item.product ? item.product.price : ""}
        </Typography>
      ),
      label: "Cost",
    },
    {
      content: (item) => (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            bottom: "1rem",
          }}
        >
          <Typography
            style={
              item.status === "approved"
                ? {
                    background: "rgba(47, 186, 86, 0.2)",
                    color: "#2FBA56",
                    borderRadius: "15px",
                    textAlign: "center",
                    padding: "5px 15px",
                  }
                : {
                    background: "rgba(254, 183, 0, 0.2)",
                    borderRadius: "15px",
                    textAlign: "center",
                    color: "#FEB700",
                    padding: "5px 15px",
                  }
            }
          >
            {item.status}
          </Typography>
        </div>
      ),
      label: "Status",
    },
  ];
};
