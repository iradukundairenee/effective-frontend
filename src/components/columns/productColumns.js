import React, { useState, useEffect } from "react";
import {
  Typography,
  ButtonGroup,
  IconButton,
  Tooltip,
  Link,
  Avatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { ICON_PATH } from "utils/constants";
import { useHistory } from "react-router-dom";
import editAsset from "../../assets/edit.svg";
import viewAsset from "../../assets/view.svg";
import { BiPlusMedical } from "react-icons/bi";
import deleteAsset from "../../assets/delete.svg";
import duplicate from "../../assets/duplicate-asset.svg";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import {
  getProduct,
  duplicateProduct,
  changeStatusProduct,
} from "redux/actions/product";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
export const ProductColumns = (
  onProductClick,
  getProductDuplicates,
  sortByStatus,
  sorted,
  products
) => {
  const history = useHistory();
  const [status, setStatus] = useState("");
  const appState = useSelector((state) => state);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const {
    login: {
      userInfo: { user },
    },
  } = appState;

  const CompanyCol = (user = {}) => {
    if (user.role !== "Client") {
      return {
        content: (item) => (
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            {item.customer.companyName}
          </Typography>
        ),
        label: "Company",
      };
    }
  };
  const editProduct = (product) => {
    history.push(`/dashboard/editproduct/${product._id}`);
    getProduct(product._id);
  };

  const duplicateAsset = (product) => {
    duplicateProduct(product._id);
    window.location.reload(true);
  };
  const handleChange = (e, productId) => {
    const newStatus = e.target.value; // get the new status from the event object
    setStatus(newStatus);
    changeStatusProduct(productId, newStatus);
  };

  const classes = useStyles();

  const renderArrow = () => {
    if (sorted.reversed) {
      return (
        <IconButton
          onClick={sortByStatus}
          style={{ height: "30px", width: "30px", padding: "5px", margin: 0 }}
        >
          <FiArrowUp />
        </IconButton>
      );
    }
    return (
      <IconButton
        onClick={sortByStatus}
        style={{ height: "30px", width: "30px", padding: "5px", margin: 0 }}
      >
        <FiArrowDown />
      </IconButton>
    );
  };

  return [
    {
      content: (item) => (
        <Typography
          style={{ display: "flex", padding: "10px 0px", alignItems: "center" }}
        >
          <Link
            component="button"
            underline="none"
            onClick={() => {
              return onProductClick(item, "preview");
            }}
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
              display: "flex",
            }}
          >
            {/* <Avatar
              src={`${ICON_PATH}/${item.product && item.product.imageIcon}`}
              style={{ marginRight: "5px" }}
            ></Avatar> */}
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
              onClick={() => {
                return getProductDuplicates(item);
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
      label: "Asset name",
    },
    {
      ...CompanyCol(user),
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
          {item.sku}
        </Typography>
      ),
      label: "SKU",
    },
    {
      content: (item) => (
        <Typography>
          <FormControl className={classes.formControl}>
            <Select
              defaultValue={item.status}
              onChange={(e) => handleChange(e, item._id)}
              InputProps={{
                underline: "none !important",
              }}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>
        </Typography>
      ),
      label: (
        <Typography
          style={{
            color: "#303030",
            fontSize: "18px",
            fontWeight: "500",
            fontFamily: "Poppins",
          }}
        >
          Status
          {sorted.sorted === "status" ? renderArrow() : null}
        </Typography>
      ),
    },
    {
      content: (item) => (
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              onClick={() => editProduct(item)}
              disabled={item.status === "approved"}
            >
              <img src={editAsset} alt="Edit asset" width={15} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              onClick={() => onProductClick(item, "preview")}
            >
              <img src={viewAsset} alt="View asset" width={20} />
            </IconButton>
          </Tooltip>
          {item.parentId !== null ? (
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => onProductClick(item, "delete")}
              >
                <img src={deleteAsset} alt="Delete asset" width={15} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Duplicate">
              <IconButton
                aria-label="Duplicate"
                onClick={() => duplicateAsset(item)}
              >
                <img src={duplicate} alt="Duplicate asset" width={15} />
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
      ),
      label: "Actions",
    },
  ];
};
