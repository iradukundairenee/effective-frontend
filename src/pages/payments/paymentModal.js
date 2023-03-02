import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import { createPaymentSession } from "redux/actions/payments";
import { useSelector } from "react-redux";
import { cssStyle } from "./styles";
import Loading from "components/loading.component";

import { BASE_URL } from "utils/constants";

const initialData = {
  paymentMode: "",
  name: "",
  currency: "",
  amount: "",
  interval: "",
  interval_count: 0,
  successUrl: "",
  cancelUrl: "",
  reason: "",
};

const PayModal = ({
  open,
  handleClose,
  item,
  action,
  mode = "subscription" || "invoice",
}) => {
  const styles = cssStyle();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(initialData);

  const state = useSelector((state) => state);
  const {
    paymentSession: { loaded: startedPayement, session },
  } = state;

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    createPaymentSession(product);
  };

  useEffect(() => {
    if (item) {
      if (mode === "subscription") {
        setProduct({
          paymentMode: mode,
          name: `${item.SubscriptionPlanName} Plan`,
          currency: "usd",
          amount: item.billingCycle[0]?.monthly,
          interval: "month",
          intervalCount: 1,
          cancelUrl: `${BASE_URL}/dashboard/subscriptions`,
          planId: item._id,
        });
      }
      if (mode === "invoice") {
        setProduct({
          invoiceId: item.invoiceId,
          paymentMode: mode,
          currency: item.currency,
          amount: item.invoiceAmount,
          cancelUrl: `${BASE_URL}/dashboard/invoices`,
        });
      }
    }
  }, [item, mode]);

  useEffect(() => {
    if (startedPayement && session) {
      setIsLoading(false);
      window.open(session?.url, "_self");
    }
  }, [session, startedPayement]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.form}>
        <Box
          className={styles.inputTitle}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          X
        </Box>
        <form id="payment-form" onSubmit={handleSubmit}>
          {mode === "subscription" && (
            <Box className={styles.data}>
              <Grid>
                <Typography
                  className={styles.inputTitle}
                  style={{ width: "100%" }}
                >
                  Plan Name
                </Typography>
                <TextField
                  className={styles.input}
                  disabled={true}
                  defaultValue={product && product.name}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
            </Box>
          )}
          <Box className={styles.data}>
            <Grid>
              <Typography className={styles.inputTitle}>Amount</Typography>
              <TextField
                className={styles.input}
                disabled={true}
                defaultValue={product?.amount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
            <Grid>
              <Typography className={styles.inputTitle}>Currency</Typography>
              <TextField
                className={styles.input}
                disabled={true}
                defaultValue={product && product.currency}
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
          </Box>
          <Button type="submit" className={styles.button}>
            {isLoading ? <Loading /> : "Pay"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default withRouter(PayModal);
