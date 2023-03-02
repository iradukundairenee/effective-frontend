import React from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  Button,
  Avatar,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { useParams } from "react-router";
import { addCouponOnCustomer } from "redux/actions/coupons";
import { addSubscriptionsCustomers } from "redux/actions/subscriptionPlan";

export const AddCustomer = ({
  open,
  handleClose,
  searchByCompany,
  searchKey,
  users,
  customers,
  action = "subscription" || "coupon",
}) => {
  const classes = useStyles();
  const { subscriptionId } = useParams();
  const { couponId } = useParams();

  const addCustomer = async (subscriptionPlanId, userId) => {
    await addSubscriptionsCustomers(subscriptionPlanId, userId);
    window.location.reload(true);
  };

  const addCustomerOnCoupon = async (couponId, userId) => {
    await addCouponOnCustomer(couponId, userId);
    window.location.reload(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <Grid className={classes.modalTitle}>
          {action === "coupon" ? "Enter user's name" : "Enter Company Name"}
        </Grid>
        <input
          type="text"
          placeholder={action === "coupon" ? "Enter user" : "Add Company Name"}
          name="name"
          value={searchKey}
          onChange={searchByCompany}
          className={classes.inputName}
          required
        />
        <Grid>
          {users.map((user, userIdx) => (
            <Grid key={userIdx}>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 60px",
                  marginBottom: "20px",
                }}
              >
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    alt="Customer"
                    src={user.profileImage}
                  />
                  <Typography
                    style={{
                      marginTop: "10px",
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#7D7D7D",
                      width: "40px",
                      marginLeft: "15px",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                </Grid>
                <Typography
                  style={{
                    marginTop: "10px",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#7D7D7D",
                  }}
                >
                  {user.companyName}
                </Typography>
                {action === "coupon" ? (
                  <Button
                    type="submit"
                    className={classes.addUserBtn}
                    disabled={customers.find(
                      (customer) => customer.user._id === user._id
                    )}
                    onClick={() => addCustomerOnCoupon(couponId, user._id)}
                  >
                    + Add
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={classes.addUserBtn}
                    disabled={customers.find(
                      (customer) => customer.user._id === user._id
                    )}
                    onClick={() => addCustomer(subscriptionId, user._id)}
                  >
                    + Add
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};
