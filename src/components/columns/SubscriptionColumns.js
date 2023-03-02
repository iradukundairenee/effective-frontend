import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { useStyles } from "styles/headerStyles";
import Modal from "@mui/material/Modal";
import { BiPencil } from "react-icons/bi";
import { getSubscriptions,getSubscription} from "redux/actions/subscriptionPlan";
import { FiEye, FiXSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { initialPaginate, paginate } from "utils/paginate";
import { deleteSubscription } from "../../redux/actions/subscriptionPlan";

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

export const SubscriptionColumns = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subscriptionplanId,setSubscriptionplanId]=useState(null);
  const classes = useStyles();
  const subscriptionsState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [mouseOver, setMouseOver] = useState(false);

  const {
    subscriptionsGet: { loading, subscriptions },
    login: {
      userInfo: { user },
    },
  } = subscriptionsState;
  useEffect(() => {
    getSubscriptions();
  }, []);
  useEffect(() => {
    if (subscriptions.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(subscriptions, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [subscriptions, paginator]);

  useEffect(() => {
    subscriptions.forEach(
      (subscription, index) => (subscription.serial = index + 1)
    );
  }, [subscriptions]);
  
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
          {item.SubscriptionPlanName}
        </Typography>
      ),
      label: "Plan Name",
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
          {item.TypeSubscriptionPlan}
        </Typography>
      ),
      label: "Plan Type",
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
            {item.billingCycle && item.billingCycle[0].monthly}
          </Typography>
        );
      },
      label: "Price",
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
          {item.Visibility}
        </Typography>
      ),
      label: "Visibility",
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
          {item.DiscountApplicable}
        </Typography>
      ),
      label: "Discount",
    },

    {
      content: (item) => (
        <ButtonGroup variant="outlined" size="large">
          {user.role !== "Client" && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  component={Link}
                  to={`/dashboard/subscriptions/${item._id}`}
                  style={{
                    color: "#7D7D7D",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <BiPencil />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Delete">
            <IconButton
              onClick={()=>{
                setSubscriptionplanId(item._id)
                return handleOpen()
              }}
              aria-label="Delete"
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              <FiXSquare />
            </IconButton>
          </Tooltip>
      
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ p: 3, backgroundColor: "#8967FC" }}>
                <Typography
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                  variant="h4"
                  noWrap
                >
                  Delete Plan
                </Typography>
              </Box>
              <Box sx={{ p: 4 }}>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Are you sure you want to delete this plan?
                </Typography>
                <Typography style={{ color: "gray", mt: 2 }}>
                  Warning Here simply dummy text of the printing and typesetting
                  industry.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="outlined"
                    className={classes.itemActionBtn}
                    style={{
                      width: "40%",
                      borderRadius: "81px",
                      border: "1px solid #8967FC",
                      color: "#8967FC",
                    }}
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    type="submit"
                    className={`${classes.addItemBtn} ${
                      mouseOver === true && classes.addItemBtnHover
                    }`}
                    onMouseOver={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    onClick={() => {
                      deleteSubscription(subscriptionplanId);
                      setSubscriptionplanId(null)
                      return window.location.reload();
                    }}
                    style={{
                      width: "40%",
                      backgroundColor: "#8967FC",
                      color: "white",
                      borderRadius: "81px",
                    }}
                  >
                    Yes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              component={Link}
              size="large"
              to={
                item.Visibility === "Public"
                  ? `/dashboard/subscriptionPlans/${item._id}`
                  : `/dashboard/subscriptionPlans/${item._id}/private`
              }
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
