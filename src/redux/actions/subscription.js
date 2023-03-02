import { store } from "../store";
import { SUBSCRIBE, GET_CURRENT_SUBSCRIPTION,SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN,VIEW_CUSTOMERS_SUBSCRIPTIONS} from "./actionTypes";
import { http } from "utils/http";

export const Subscribe = (id, sub) => {
  store.dispatch({
    type: SUBSCRIBE,
    payload: http.post(`/subscription/${id}`, sub),
  });
};

export const subscribeOrChangeSubcriptionPlan = (id,billingCycle="Monthly") => {
  store.dispatch({
    type:SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN,
    payload: http.post(`/subscription/add/${id}`,billingCycle),
  });
};


export const getCurrentSubscription = () => {
  store.dispatch({
    type: GET_CURRENT_SUBSCRIPTION,
    payload: http.get("/subscription/currentSubscription"),
  });
};


export const viewCustomerSubscriptions = (id) => {
  store.dispatch({
    type: VIEW_CUSTOMERS_SUBSCRIPTIONS,
    payload: http.get(`/crm/subscription/${id}`),
  });
};
