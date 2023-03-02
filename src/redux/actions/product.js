import { store } from "../store";
import { browserHistory } from "history";
import {
  ADD_NEW_PRODUCT,
  DELETE_ATTR_IMAGE,
  DELETE_PRODUCT,
  GENERATE_QR,
  GET_ANALYTICS,
  GET_PRODUCT,
  GET_SINGLE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_IMAGES,
  RESET_UPLOAD_A_IMAGE,
  UPDATE_ATTRIBUTES,
  UPDATE_PRODUCT,
  UPLOAD_ATTR_IMAGE,
  UPLOAD_PRODUCT_IMAGES,
  UPLOAD_PROFILE,
  DUPLICATE_PRODUCT,
  GET_DUPLICATES,
  GET_DUPLICATES_ANALYTICS,
  GET_SINGLE_ANALYTIC,
  ASSET_ICON,
  GET_COUNTRIES,
  CHANGE_PRODUCT_STATUS,
  GET_QR_PRODUCT
} from "./actionTypes";
import { http } from "utils/http";
import { BASE_URL } from "utils/constants";

const PRODUCTS_URL = "/products";
const uploadType = {
  image3d: UPLOAD_PRODUCT_IMAGES,
  "attr-image": UPLOAD_ATTR_IMAGE,
  "profile-img": UPLOAD_PROFILE,
  "asset-icon": ASSET_ICON,
};
export const uploadProductImages = (
  files,
  imageType = "image3d",
  otherAttribs = {}
) => {
  const formData = new FormData();
  for (const key of Object.keys(files)) {
    formData.append("productFiles", files[key]);
  }
  const { productId, imgType, userId } = otherAttribs;
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let uploadUrl = `${PRODUCTS_URL}/upload/${imageType}`;
  if (productId && imgType) {
    uploadUrl += `?productId=${productId}&imgType=${imgType}&userId=${userId}`;
  }
  if (userId && !productId) {
    uploadUrl += `?userId=${userId}`;
  }
  store.dispatch({
    type: uploadType[imageType],
    payload: http.post(uploadUrl, formData, config),
  });
};

export const addNewProduct = (productBody) => {
  store.dispatch({
    type: ADD_NEW_PRODUCT,
    payload: http.post(`${PRODUCTS_URL}`, productBody),
  });
};

export const getProducts = ({ projectId }) => {
  let params = "?";
  if (projectId) {
    params += `project=${projectId}`;
  }
  store.dispatch({
    type: GET_PRODUCTS,
    payload: http.get(PRODUCTS_URL + params),
  });
};

export const getProductImages = (productId = "") => {
  store.dispatch({
    type: GET_PRODUCT_IMAGES,
    payload: http.get(`${PRODUCTS_URL}/files/${productId}`),
  });
};
export const editProduct = (productBody) => {
  const { _id, __v, ...rest } = productBody;
  store.dispatch({
    type: UPDATE_PRODUCT,
    payload: http.patch(`${PRODUCTS_URL}/${_id}`, rest),
  });
};
export const changeStatusProduct = (id,status) => {
  store.dispatch({
    type:CHANGE_PRODUCT_STATUS,
    payload: http.patch(`/products/status/${id}`,{status}),
  });
};

export const updateAttributes = (attributesBody = {}, productId = "") => {
  store.dispatch({
    type: UPDATE_ATTRIBUTES,
    payload: http.patch(
      `${PRODUCTS_URL}/attributes/${productId}`,
      attributesBody
    ),
  });
};

export const getProduct = (productId = "") => {
  const config = {};
  const ancOrigins = document.location?.ancestorOrigins || [];
  if (ancOrigins.length > 0) {
    config.headers = { "ancestor-origin": ancOrigins[0] };
  }
  store.dispatch({
    type: GET_PRODUCT,
    payload: http.get(`${PRODUCTS_URL}/${productId}`, config),
  });
};

export const viewProduct = (productId = "", parentUrl) => {
  store.dispatch({
    type: GET_SINGLE_PRODUCT,
    payload: http.get(`${PRODUCTS_URL}/viewProduct/${productId}`, {
      params: { parentUrl },
    }),
  });
};

export const qrProduct = (productId = "", code) => {
  store.dispatch({
    type: GET_SINGLE_PRODUCT,
    payload: http.get(`${PRODUCTS_URL}/qr/${productId}/${code}`),
  });
};

export const uploadAttrImage = (formData, imageType = "", productId = {}) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let uploadUrl = `${PRODUCTS_URL}/upload/${imageType}`;
  uploadUrl += `/${productId}`;
  store.dispatch({
    type: UPLOAD_ATTR_IMAGE,
    payload: http.post(uploadUrl, formData, config),
  });
};
export const resetUploadAttrImg = () => {
  store.dispatch({
    type: RESET_UPLOAD_A_IMAGE,
  });
};
export const deleteAttrImg = (productId = "", imgFile = "") => {
  const url = `${PRODUCTS_URL}/${productId}/image/${imgFile}`;

  store.dispatch({
    type: DELETE_ATTR_IMAGE,
    payload: http.delete(url),
  });
};
export const getProdAnalytics = (deviceChecked, checkedCountries) => {
  let filters = {};
  let countriesPart =
    checkedCountries &&
    checkedCountries.map((country) => `country=${country}`).join("&");
  let params;

  if (checkedCountries.length && deviceChecked) {
    params = `?device=${deviceChecked}&${countriesPart}`;
  } else if (filters.project) {
    params += `&project=${filters.project}`;
  } else {
    params = `?time=${filters.time || "allTime"}`;
  }

  store.dispatch({
    type: GET_ANALYTICS,

    payload: http.get(`${PRODUCTS_URL}/get/analytics${params}`),
  });
};

export const getCountries = () => {
  store.dispatch({
    type: GET_COUNTRIES,
    payload: http.get(`${PRODUCTS_URL}/countries`),
  });
};

export const generateQR = (productId, code) => {
  const qrCodeData = {
    data: `${BASE_URL}/dashboard/qr/product/${productId}/${code}`,
    size: "200x200",
    bgcolor: "FFFFFF",
    color: "9722FF",
  };
  const params = Object.entries(qrCodeData)
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");
  store.dispatch({
    type: GENERATE_QR,
    payload: `${process.env.REACT_APP_QR_URL}/create-qr-code/?${params}`,
  });
};

export const deleteProduct = (productId) => {
  store.dispatch({
    type: DELETE_PRODUCT,
    payload: http.delete(`${PRODUCTS_URL}/${productId}`),
  });
};

export const getSingleAnalytic = (analyticId) => {
  store.dispatch({
    type: GET_SINGLE_ANALYTIC,
    payload: http.get(`${PRODUCTS_URL}/get/analytics/${analyticId}`),
  });
};
export const duplicateProduct = (productId) => {
  store.dispatch({
    type: DUPLICATE_PRODUCT,
    payload: http.post(`${PRODUCTS_URL}/${productId}`),
  });
};
export const getDuplicates = (productId) => {
  store.dispatch({
    type: GET_DUPLICATES,
    payload: http.get(`${PRODUCTS_URL}/${productId}/duplicates`),
  });
};

export const getDuplicatesAnalytics = (productId) => {
  store.dispatch({
    type: GET_DUPLICATES_ANALYTICS,
    payload: http.get(`${PRODUCTS_URL}/analyticsDuplicate/${productId}`),
  });
};
