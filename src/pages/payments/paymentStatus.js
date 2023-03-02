import { Box, Button, Grid, Modal } from "@material-ui/core";
import Loading from "components/loading.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  invoiceStatusAfterPayment,
  notifyPaidInvoice,
  updateInvoice,
} from "redux/actions/invoice";
import {
  generatePoints,
  getSessionOnSuccess,
  notifyPayment,
} from "redux/actions/payments";
import {
  getCurrentSubscription,
  subscribeOrChangeSubcriptionPlan,
} from "redux/actions/subscription";
import { cssStyle } from "./styles";

export const PaymentStatus = () => {
  const styles = cssStyle();
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [oldSubscriptionId, setOldSubscriptionId] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [planId, setPlanId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const state = useSelector((state) => state);
  const {
    sessionOnSuccessPayment: { session },
    changeSubscription: { loaded, changeSubscription },
    generatePoints: { loaded: pointsAdded, points },
    currentSubscription: { subscription },
    invoiceStatusAfterPayment: { loaded: invoicePaid },
  } = state;

  const handleFinish = () => {
    setLoading(true);
    if (planId)
      subscribeOrChangeSubcriptionPlan(planId, { billingCycle: "Monthly" });
    if (invoiceId) {
      invoiceStatusAfterPayment(
        { status: "paid", amount: session.amount_total },
        invoiceId
      );
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("status")) {
      setSessionId(query.get("sessionId"));
      setSuccess(true);
      if (query.get("planId")) setPlanId(query.get("planId"));
      if (query.get("invoiceId")) setInvoiceId(query.get("invoiceId"));
    }
    getCurrentSubscription();
  }, []);

  useEffect(() => {
    if (subscription) setOldSubscriptionId(subscription._id);
  }, [subscription]);

  useEffect(() => {
    if (sessionId) {
      getSessionOnSuccess(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (loaded && changeSubscription && session) {
      notifyPayment({
        currency: session.currency,
        plan: changeSubscription,
        hadAnother: oldSubscriptionId,
      });
      generatePoints({ amount: session.amount_total });
    }
  }, [changeSubscription, loaded, oldSubscriptionId, session]);

  useEffect(() => {
    if (invoicePaid && session) {
      notifyPaidInvoice({ session: session, invoiceId: invoiceId });
      generatePoints({ amount: session.amount_total });
      setLoading(false);
      history.push("/dashboard/invoices");
    }
  }, [history, invoiceId, invoicePaid, session]);

  useEffect(() => {
    if (pointsAdded && points) {
      setLoading(false);
      history.push("/dashboard/subscriptions");
    }
  }, [history, points, pointsAdded]);

  useEffect(() => {
    if (invoicePaid) {
      setLoading(false);
      history.push("/dashboard/invoices");
    }
  }, [history, invoicePaid]);

  return (
    <Grid>
      <Modal open={success}>
        <Box className={styles.form}>
          <Box
            className={styles.inputTitle}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Successfully Paid
          </Box>
          <Button className={styles.button} onClick={handleFinish}>
            {isLoading ? <Loading /> : "Finish"}
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};
