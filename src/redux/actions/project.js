import { store } from "../store";
import {
  ADD_NEW_PROJECT,
  EDIT_PROJECT,
  ARCHIVE_PROJECT,
  GET_DASHBOARD_COUNTS,
  GET_PROJECT_HISTORIES,
  GET_PROJECTS,
  GET_PROJECT_DETAILS,
  ADD_NEW_LOG,
  ADD_PROJECT_PROD,
  GET_PROJECT_PROD,
  VIEW_CUSTOMER_PROJECT_LIST,
  SINGLE_CUSTOMER_PROJECT_LIST,
  COMPLETE_PROJECT,
} from "./actionTypes";
import { http } from "utils/http";

const BASE_URL = "/project/";
export const addNewProject = (projectInfo) => {
  store.dispatch({
    type: ADD_NEW_PROJECT,
    payload: http.post(BASE_URL, projectInfo),
  });
};
export const getProjects = ({ status, clientId }) => {
  let params = "";
  if (status) {
    params += `status=${status}&`;
  }
  if (clientId) {
    params += `client=${clientId}&`;
  }
  store.dispatch({
    type: GET_PROJECTS,
    payload: http.get(`${BASE_URL}?${params}`),
  });
};
export const updateProject = (projectInfo, projectId) => {
  store.dispatch({
    type: EDIT_PROJECT,
    payload: http.patch(BASE_URL + projectId, projectInfo),
  });
};

export const completeProject = (projectId) => {
  store.dispatch({
    type: COMPLETE_PROJECT,
    payload: http.patch(BASE_URL + "complete-project/" + projectId),
  });
};

export const archiveProject = (projectId) => {
  store.dispatch({
    type: ARCHIVE_PROJECT,
    payload: http.patch(BASE_URL + "archiveProject/" + projectId),
  });
};

export const getDashboardCounts = () => {
  store.dispatch({
    type: GET_DASHBOARD_COUNTS,
    payload: http.get("/home/dashboard"),
  });
};
export const getProjectHistories = (projectId = "") => {
  store.dispatch({
    type: GET_PROJECT_HISTORIES,
    payload: http.get(`${BASE_URL + projectId}/histories`),
  });
};
export const getProjectDetails = (projectId = "") => {
  store.dispatch({
    type: GET_PROJECT_DETAILS,
    payload: http.get(BASE_URL + projectId),
  });
};

export const getProjectListDetails = (type, id) => {
  store.dispatch({
    type: VIEW_CUSTOMER_PROJECT_LIST,
    payload: http.get(`/crm/projects/${type}/${id}`),
  });
};

// export const getSingleProjectListDetails = (id,projectId) => {
//   store.dispatch({
//     type:SINGLE_CUSTOMER_PROJECT_LIST,
//     payload: http.get(`/crm/user/62ea6c42ef48c303cc904ce2/63465d266d1fe026c07034c3`),
//   });
// };

export const addNewLog = (projectId = "", logBody = {}) => {
  store.dispatch({
    type: ADD_NEW_LOG,
    payload: http.post(`${BASE_URL + projectId}/histories`, logBody),
  });
};
export const addProjectProd = (newProduct = {}) => {
  const { projectId, ...rest } = newProduct;
  store.dispatch({
    type: ADD_PROJECT_PROD,
    payload: http.post(`${BASE_URL + projectId}/products`, rest),
  });
};
export const getProjectProds = (ppId, type = "project") => {
  let urlWithParams = `${BASE_URL + ppId}/products`;
  urlWithParams += `?type=${type}`;
  store.dispatch({
    type: GET_PROJECT_PROD,
    payload: http.get(urlWithParams),
  });
};
