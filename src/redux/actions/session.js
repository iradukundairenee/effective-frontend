import { store } from "../store";
import { http } from "utils/http";
import {
  START_SESSION,
  END_SESSION,
  GET_SESSIONS_BY_USER,
  SELECTED_SESSION,
} from "./actionTypes";

export const startSession = () => {
  store.dispatch({
    type: START_SESSION,
    // payload: http.post("/session/start"),
  });
};

export const endSession = () => {
  store.dispatch({
    type: END_SESSION,
    payload: http.patch("/session/end"),
  });
};

export const getSessionsByUser = (userId) => {
  store.dispatch({
    type: GET_SESSIONS_BY_USER,
    payload: http.get(`/session/getByUser/${userId}`),
  });
};

export const selectedSession = (index) => {
  store.dispatch({
    type: SELECTED_SESSION,
    payload: index,
  });
}
