import { store } from "../store";
import {
  GET_SUBSCRIPTIONS,
  ADD_SUBSCRIPTIONS,
  GET_SUBSCRIPTION,
  EDIT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  ADD_SUBSCRIPTION_CUSTOMERS,
  GET_SUBSCRIPTION_CUSTOMERS,
  GET_ALL_SUBSCRIPTIONS,
} from "./actionTypes";
import { http } from "utils/http";

export const addSubscriptions = (subInfo) => {
  store.dispatch({
    type: ADD_SUBSCRIPTIONS,
    payload: http.post(`subscriptionPlan/create`, subInfo),
  });
};

export const getSubscriptions = () => {
  store.dispatch({
    type: GET_SUBSCRIPTIONS,
    payload: http.get("/subscriptionPlan"),
  });
};

export const getSubscription = (subscriptionId) => {
  store.dispatch({
    type: GET_SUBSCRIPTION,
    payload: http.get(`/subscriptionPlan/${subscriptionId}`),
  });
};

export const editSubscription = (subscriptionId, subscriptionInfo) => {
  store.dispatch({
    type: EDIT_SUBSCRIPTION,
    payload: http.patch(
      `/subscriptionPlan/edit/${subscriptionId}`,
      subscriptionInfo
    ),
  });
};

export const deleteSubscription = (subscriptionId) => {
  store.dispatch({
    type: DELETE_SUBSCRIPTION,
    payload: http.patch(`/subscriptionPlan/delete/${subscriptionId}`),
  });
};

export const addSubscriptionsCustomers = (subscriptionPlanId, userId) => {
  store.dispatch({
    type: ADD_SUBSCRIPTION_CUSTOMERS,
    payload: http.post(
      `subscriptionPlan/${subscriptionPlanId}/create/${userId}`
    ),
  });
};

export const getSubscriptionsCustomers = (subscriptionPlanId) => {
  store.dispatch({
    type: GET_SUBSCRIPTION_CUSTOMERS,
    payload: http.get(`subscriptionPlan/${subscriptionPlanId}/customers`),
  });
};

export const getUserPrivateSubscriptionPlans = () => {
  store.dispatch({
    type: GET_ALL_SUBSCRIPTIONS,
    payload: http.get(`/subscriptionPlan/userPlans/all`),
  });
};
