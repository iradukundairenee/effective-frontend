import { store } from "../store";
import { ADD_ITEM, GET_ITEMS, UPDATE_ITEM } from "./actionTypes";
import { http } from "utils/http";

export const getItems = () => {
  store.dispatch({
    type: GET_ITEMS,
    payload: http.get("/item"),
  });
};

export const addItem = (data) => {
  store.dispatch({
    type: ADD_ITEM,
    payload: http.post(`item`, data),
  });
};

export const updateItem = (data, itemId) => {
  store.dispatch({
    type: UPDATE_ITEM,
    payload: http.patch(`item/${itemId}`, data),
  });
};
