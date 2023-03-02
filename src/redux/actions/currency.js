import { store } from "redux/store";
import { http } from "utils/http";
import {
  CREATE_CURRENCY,
  GET_ALL_CURRENCY,
  COUNT_CURRENCY,
  GET_SINGLE_CURRENCY,
  UPDATE_CURRENCY,
  USER_CURRENCY,
} from "./actionTypes";

export const createCurrency = async (newCurrency) => {
  store.dispatch({
    type: CREATE_CURRENCY,
    payload: http.post("/currency/", newCurrency),
  });
};

export const getAllCurrency = () => {
  store.dispatch({
    type: GET_ALL_CURRENCY,
    payload: http.get("/currency/"),
  });
};

export const countCurrency = (currencyId) => {
  store.dispatch({
    type: COUNT_CURRENCY,
    payload: http.get(`/currency/client/${currencyId}`),
  });
};

export const getSingleCurrency = async (id) => {
  store.dispatch({
    type: GET_SINGLE_CURRENCY,
    payload: http.get(`/currency/${id}`),
  });
};

export const updateCurrency = async (id, data) => {
  store.dispatch({
    type: UPDATE_CURRENCY,
    payload: http.patch(`/currency/${id}`, data),
  });
};

export const getCurrencyByUser = async (userId) => {
  let params = "";
  if (userId) {
    params += `userId=${userId}`;
  }
  store.dispatch({
    type: USER_CURRENCY,
    payload: http.get(`/currency/userCurrency?${params}`),
  });
};
