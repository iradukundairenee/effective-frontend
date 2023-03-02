import { store } from "redux/store";
import { http } from "utils/http";
import {
  CREATE_PAYMENT_SESSION,
  GENERATE_POINTS,
  GET_SESSION_ON_SUCCESS_PAYMENT,
  NOTIFY_PAYMENT,
} from "./actionTypes";

export const createPaymentSession = (data) => {
  store.dispatch({
    type: CREATE_PAYMENT_SESSION,
    payload: http.post("/payment/pay", data),
  });
};

export const notifyPayment = (data) => {
  store.dispatch({
    type: NOTIFY_PAYMENT,
    payload: http.post("/mail/notify", data),
  });
};

export const getSessionOnSuccess = (sessionId) => {
  let params = "";
  if (sessionId) {
    params += `sessionId=${sessionId}`;
  }
  store.dispatch({
    type: GET_SESSION_ON_SUCCESS_PAYMENT,
    payload: http.get(`/payment/success?${params}`),
  });
};

export const generatePoints = (data) => {
  store.dispatch({
    type: GENERATE_POINTS,
    payload: http.post(`/payment/generatePoints`, data),
  });
};
