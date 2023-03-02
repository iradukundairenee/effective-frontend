import { store } from "../store";
import { useHistory } from "react-router-dom";
import { USER_INFO } from "utils/constants";
import {
  REMOVE_PROFILE,
  RESET_PASSWORD,
  SEND_LINK,
  SET_PASSWORD,
  VALIDATE_RESET_TOKEN,
  UPDATE_PROFILE,
  USER_DELETE,
  USER_LIST,
  USER_REGISTER,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_UPDATE,
  CHANGE_PASSWORD,
  UPDATE_USER_PROFILE,
  ADMIN_GET_USERS,
  ADD_DOMAIN_NAMES,
  GET_DOMAIN_NAMES,
  END_SESSION,
  GET_SINGLE_USER,
  RESET_UPDATE_PROFILE,
  RESET_UPDATE_USER_PROFILE,
} from "./actionTypes";
import { http } from "utils/http";

export const signin = (userInfo) => {
  store.dispatch({
    type: USER_SIGNIN,
    payload: http.post("/auth/login", userInfo),
  });
};
export const registerUser = (userInfo) => {
  store.dispatch({
    type: USER_REGISTER,
    payload: http.post("/crm/createUser", userInfo),
  });
};
export const signout = () => {
  store.dispatch({
    type: USER_SIGNOUT,
  });
  localStorage.removeItem(USER_INFO);
};

export const endSession = () => {
  store.dispatch({
    type: END_SESSION,
    payload: http.post("/auth/logout"),
  });
};

export const getUsersList = (userRoleType = "") => {
  let userUrl = "/auth/users";
  if (userRoleType) {
    userUrl += `?role=${userRoleType}`;
  }
  store.dispatch({
    type: USER_LIST,
    payload: http.get(userUrl),
  });
};
export const adminGetUsers = () => {
  store.dispatch({
    type: ADMIN_GET_USERS,
    payload: http.get("/crm/users"),
  });
};
export const getSingleUser = (userId) => {
  store.dispatch({
    type: GET_SINGLE_USER,
    payload: http.get(`/auth/user/${userId}`),
  });
};
export const validateToken = (token) => {
  store.dispatch({
    type: VALIDATE_RESET_TOKEN,
    payload: http.post("/auth/validatePasswordResetToken", { token: token }),
  });
};

export const setPassword = (credentials) => {
  store.dispatch({
    type: SET_PASSWORD,
    payload: http.patch("/auth/set-password", credentials),
  });
};
export const updateUser = (userInfo) => {
  const { _id: userId, ...rest } = userInfo;
  store.dispatch({
    type: USER_UPDATE,
    payload: http.patch(`/auth/users/${userId}`, rest),
  });
};
export const deleteUser = (userId = "") => {
  store.dispatch({
    type: USER_DELETE,
    payload: http.delete(`/auth/users/${userId}`),
  });
};
export const updateProfile = (userInfo) => {
  store.dispatch({
    type: UPDATE_PROFILE,
    payload: http.patch(`/auth/edit-profile`, userInfo),
  });
};
export const resetUpdateProfile = () => {
  store.dispatch({
    type: RESET_UPDATE_PROFILE,
  });
};
export const updateUserProfile = (userInfo) => {
  const { _id: userId, ...rest } = userInfo;
  store.dispatch({
    type: UPDATE_USER_PROFILE,
    payload: http.patch(`/crm/updateUser/${userId}`, rest),
  });
};
export const resetUpdateUserProfile = () => {
  store.dispatch({
    type: RESET_UPDATE_USER_PROFILE,
  });
};
export const removeProfilePic = () => {
  store.dispatch({
    type: REMOVE_PROFILE,
    payload: http.delete(`/auth/delete-profile-pic`),
  });
};
export const sendLink = (email = "") => {
  store.dispatch({
    type: SEND_LINK,
    payload: http.post("/auth/send-reset-link", { email }),
  });
};
export const resetPassword = (credentials) => {
  store.dispatch({
    type: RESET_PASSWORD,
    payload: http.post("/auth/reset-password", credentials),
  });
};
export const changePassword = (info, setDisabled) => {
  store.dispatch({
    type: CHANGE_PASSWORD,
    payload: http.patch(`/auth/change-password`, info),
  });
  setDisabled(false);
};

export const addDomainNames = (userId, domainNames) => {
  store.dispatch({
    type: ADD_DOMAIN_NAMES,
    payload: http.post(`/auth/domain-names/${userId}`, domainNames),
  });
};

export const getDomainNames = (userId) => {
  store.dispatch({
    type: GET_DOMAIN_NAMES,
    payload: http.get(`/auth/domain-names/${userId}`),
  });
};
