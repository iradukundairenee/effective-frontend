import { store } from "../store";
import {
  GET_LOYALTY_POINTS,
  ADD_LOYALTY_POINTS,
  GET_SINGLE_LOYALTY_POINT,
  UPDATE_LOYALTY_POINT,
} from "./actionTypes";
import { http } from "utils/http";

export const getLoyaltyPoints = () => {
  store.dispatch({
    type: GET_LOYALTY_POINTS,
    payload: http.get("/loyaltypoints"),
  });
};

export const getSingleLoyaltyPoint = (pointsId) => {
  store.dispatch({
    type: GET_SINGLE_LOYALTY_POINT,
    payload: http.get(`/loyaltypoints/${pointsId}`),
  });
};

export const addLoyaltyPoints = (loyaltypoint) => {
  store.dispatch({
    type: ADD_LOYALTY_POINTS,
    payload: http.post("/loyaltypoints", loyaltypoint),
  });
};

export const updateLoyaltyPoint = (pointsId, loyaltypoint) => {
  store.dispatch({
    type: UPDATE_LOYALTY_POINT,
    payload: http.patch(`/loyaltypoints/${pointsId}`, loyaltypoint),
  });
};
