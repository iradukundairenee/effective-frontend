import { store } from "../store";
import { http } from "utils/http";
import { GET_ASSET_LOGS, ADD_ASSET_LOGS } from "./actionTypes";

const LOGS_URL = "/logs"

export const get_asset_logs = (productId) => {
  store.dispatch({
    type: GET_ASSET_LOGS,
    payload: http.get(`${LOGS_URL}/all/${productId}`)
  })
}

export const add_asset_logs = (logs) => {
  store.dispatch({
    type: ADD_ASSET_LOGS,
    payload: http.post(`${LOGS_URL}/many`, logs)
  })
}
