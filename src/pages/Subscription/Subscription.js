import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AdminSubscription } from "./adminSubscription";
import { ViewPublicSubscription } from "./ViewPublicSubcription";

export const SubscriptionPage = () => {
  const subscriptionsState = useSelector((state) => state);

  const {
    login: {
      userInfo: { user },
    },
  } = subscriptionsState;

  return (
    <Grid>
      {user.role !== "Client" ? (
        <AdminSubscription />
      ) : (
        <ViewPublicSubscription />
      )}
    </Grid>
  );
};
