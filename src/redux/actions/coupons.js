import { store } from "redux/store";
import { http } from "utils/http";
import {
  CREATE_COUPON,
  DELETE_COUPON_ON_CUSTOMER,
  GET_ALL_COUPONS,
  GET_CLIENT_COUPONS,
  GET_SINGLE_COUPON,
  GET_SINGLE_COUPON_CUSTOMERS,
  UPDATE_COUPON,
} from "./actionTypes";

export const createCoupon = (couponInfo) => {
  store.dispatch({
    type: CREATE_COUPON,
    payload: http.post("/coupons/create", couponInfo),
  });
};

export const addCouponOnCustomer = (couponId, userId) => {
  store.dispatch({
    type: CREATE_COUPON,
    payload: http.post(`/coupons/${couponId}/${userId}`),
  });
};

export const getAllCoupons = () => {
  store.dispatch({
    type: GET_ALL_COUPONS,
    payload: http.get("/coupons"),
  });
};

export const getCoupon = (couponId) => {
  store.dispatch({
    type: GET_SINGLE_COUPON,
    payload: http.get(`/coupons/${couponId}`),
  });
};

export const getCouponCustomers = (couponId) => {
  store.dispatch({
    type: GET_SINGLE_COUPON_CUSTOMERS,
    payload: http.get(`/coupons/${couponId}/customers`),
  });
};

export const getClientCoupons = () => {
  store.dispatch({
    type: GET_CLIENT_COUPONS,
    payload: http.get(`/coupons/clientCoupon`),
  });
};

export const deleteCouponOnCustomer = (couponId, userId) => {
  store.dispatch({
    type: DELETE_COUPON_ON_CUSTOMER,
    payload: http.delete(`/coupons/${couponId}/${userId}`),
  });
};

export const updateCoupon = (couponId, updates) => {
  store.dispatch({
    type: UPDATE_COUPON,
    payload: http.patch(`/coupons/${couponId}`, updates),
  });
};
