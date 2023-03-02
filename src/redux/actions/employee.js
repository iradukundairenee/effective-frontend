import { store } from "../store";
import { GET_CRM_EMPLOYEES } from "./actionTypes";
import { http } from "utils/http";

export const getAllEmployees = () => {
  store.dispatch({
    type: GET_CRM_EMPLOYEES,
    payload: http.get("/crm/employees"),
  });
};
