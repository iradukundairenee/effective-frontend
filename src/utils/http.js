import axios from "axios";
import { USER_INFO } from "./constants";

let user = JSON.parse(localStorage.getItem(USER_INFO));
let token = "";
if (user) {
  token = user.token;
}

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/v1`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const qrCodeHttp = axios.create({
  baseURL: process.env.REACT_APP_QR_URL,
});
