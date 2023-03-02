import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  IconButton,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import {
  applyCouponOnInvoice,
  applyPointsOnInvoice,
} from "redux/actions/invoice";
import { useParams } from "react-router";
import { notifier } from "utils/notifier";

export const InvoiceModal = ({
  open,
  handleClose,
  action = "points" || "coupon",
}) => {
  const classes = useStyles();
  const { invoiceId } = useParams();
  const [values, setValues] = useState({});
  const [points, setPoints] = useState(0);
  const [pointsEquiva, setPointsEquiva] = useState(0);

  const changeCoupon = (e) => {
    if (e.target.value) {
      setValues(e.target.value);
    }
  };

  const redeemPoints = (e) => {
    if (e.target.value) {
      setPoints(e.target.value);
    }
  };

  const applyCoupon = (invoiceId, couponId) => {
    applyCouponOnInvoice(invoiceId, couponId);
  };

  useEffect(() => {
    if (points) {
      setPointsEquiva(points * 0.04);
    }
  }, [points]);

  const state = useSelector((state) => state);

  const {
    clientCoupon: { coupons },
    applyCouponOnInvoice: { loaded, loading },
    applyPointsOnInvoice: { loaded: loadedPoints, loading: loadingPoints },
    login: {
      userInfo: {
        user: { loyaltyPoints },
      },
    },
  } = state;

  if (loaded || loadedPoints) {
    notifier.success("Coupon added successfully");
    window.location.reload(true);
  }
  if (loyaltyPoints && loyaltyPoints.accruedPoints < points) {
    notifier.error("you can't redeem points more than you have");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <Grid className={classes.modalTitle}>
          {action === "coupon" ? "Apply Coupon Code" : "Apply Loyalty Points"}
        </Grid>
        {action === "coupon" ? (
          <Box className={classes.container}>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Coupon Code
              </Typography>
              <Select
                required
                className={classes.inputName}
                name="applicability"
                onChange={changeCoupon}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                {coupons &&
                  coupons.map((coupon, idx) => (
                    <MenuItem value={coupon.coupon} key={idx}>
                      {coupon.coupon && coupon.coupon.couponCode}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Equivalent{" "}
              </Typography>
              <Typography
                className={classes.inputTitle}
                style={{ opacity: "0.6" }}
              >
                {values && (values.percentageValue || values.discountAmount)
                  ? values.couponType === "Percentage"
                    ? values.percentageValue + "%"
                    : "$" + values.discountAmount
                  : "0"}
              </Typography>
            </Grid>
          </Box>
        ) : (
          <Box className={classes.container}>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Available Points
              </Typography>
              <TextField
                disabled
                className={classes.inputName}
                InputProps={{ disableUnderline: true }}
                value={
                  loyaltyPoints &&
                  loyaltyPoints.accruedPoints &&
                  loyaltyPoints.accruedPoints - points
                }
                name="accruedPoints"
              />
            </Grid>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Redeem Points
              </Typography>
              <TextField
                className={classes.inputName}
                InputProps={{ disableUnderline: true }}
                onChange={redeemPoints}
                name="redeem"
                placeholder="Points to redeem"
                autoFocus
              />
            </Grid>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>Equivalent</Typography>
              <TextField
                disabled
                className={classes.inputName}
                InputProps={{ disableUnderline: true }}
                value={`$${pointsEquiva}`}
                name="equivalent"
              />
            </Grid>
          </Box>
        )}
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <IconButton
            variant="outlined"
            className={classes.itemActionBtn}
            onClick={handleClose}
            style={{ width: "45%" }}
          >
            Cancel
          </IconButton>
          <IconButton
            variant="outlined"
            className={classes.addItemBtn}
            disabled={loading || loadingPoints}
            style={{ width: "45%" }}
            onClick={() => {
              action === "coupon" &&
                applyCoupon(invoiceId, { coupon: values._id });
              action === "points" &&
                applyPointsOnInvoice(invoiceId, {
                  points: points,
                });
            }}
          >
            Apply
          </IconButton>
        </Grid>
      </Box>
    </Modal>
  );
};
