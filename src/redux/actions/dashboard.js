import { store } from "redux/store";
import {
  GET_ASSETS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNT,
} from "./actionTypes";
import { http } from "utils/http";

export const getNotifications = (type = "") => {
  let routeParams = "notifications";
  let actionType = GET_NOTIFICATIONS;
  if (type !== "") {
    routeParams += "?type=count";
    actionType = GET_NOTIFICATIONS_COUNT;
  }
  store.dispatch({
    type: actionType,
    payload: http.get(`/home/${routeParams}`),
  });
};

export const getAssets = (data) => {
  let params = "";
  if (data && data.company) {
    params += `company=${data.company}&`;
  }
  if (data && data.project) {
    params += `project=${data.project}&`;
  }
  if (data && data.time) {
    params += `time=${data.time}&`;
  }
  store.dispatch({
    type: GET_ASSETS,
    payload: http.get(`/dashboard?${params}`),
  });
};
