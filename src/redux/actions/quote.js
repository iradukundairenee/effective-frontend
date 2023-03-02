import { store } from "../store";
import { http } from "utils/http";
import {
  ADD_NEW_QUOTE,
  UPDATE_QUOTE,
  GET_QUOTES,
  GET_QUOTE,
  ADD_QUOTE_TAX,
  UPDATE_QUOTE_TAX,
  UPDATE_QUOTE_TEXT,
  DELETE_QUOTE_TAX,
  EDIT_QUOTE_ITEM,
  DELETE_QUOTE_ITEM,
  SEND_QUOTE,
  ACCEPT_QUOTE,
  REJECT_QUOTE,
  UPDATE_QUOTE_DISCOUNT,
  CREATE_QUOTE_PDF,
  DOWNLOAD_QUOTE_PDF,
  ADD_QUOTE_ITEM,
  UN_ADDED_QUOTE_ITEM,
  UPDATE_LICENSE_AGREEMENT,
  GET_LICENSE_AGREEMENT,
} from "./actionTypes";

export const addNewQuote = (quoteInfo) => {
  store.dispatch({
    type: ADD_NEW_QUOTE,
    payload: http.post("/quote", quoteInfo),
  });
};

export const getQuotes = () => {
  store.dispatch({
    type: GET_QUOTES,
    payload: http.get("/quote"),
  });
};

export const getLicenseAgreement = () => {
  store.dispatch({
    type: GET_LICENSE_AGREEMENT,
    payload: http.get("/quote/license-agreement/"),
  });
};

export const updateProposalText = (quoteId, propasalText) => {
  store.dispatch({
    type: UPDATE_QUOTE_TEXT,
    payload: http.patch(`/quote/updateProposalText/${quoteId}`, {
      propasalText: propasalText,
    }),
  });
};

export const updateLicenseAgreement = (licenseText) => {
  store.dispatch({
    type: UPDATE_LICENSE_AGREEMENT,
    payload: http.post(`/quote/updateLicenseAgreement/`, {
      licenseText: licenseText,
    }),
  });
};

export const updateQuote = (quoteInfo, quoteId) => {
  store.dispatch({
    type: UPDATE_QUOTE,
    payload: http.patch(`/quote/${quoteId}`, quoteInfo),
  });
};
export const getQuote = (quoteId) => {
  store.dispatch({
    type: GET_QUOTE,
    payload: http.get(`/quote/${quoteId}`),
  });
};

export const addQuoteTax = (quoteId, taxInfo) => {
  store.dispatch({
    type: ADD_QUOTE_TAX,
    payload: http.post(`/quote/tax/${quoteId}`, taxInfo),
  });
};

export const updateQuoteTax = (quoteId, taxId, taxInfo) => {
  store.dispatch({
    type: UPDATE_QUOTE_TAX,
    payload: http.patch(`/quote/tax/${quoteId}/${taxId}`, taxInfo),
  });
};

export const deleteQuoteTax = (quoteId, taxId) => {
  store.dispatch({
    type: DELETE_QUOTE_TAX,
    payload: http.delete(`/quote/tax/${quoteId}/${taxId}`),
  });
};

export const addQuoteItem = (quoteId, data) => {
  store.dispatch({
    type: ADD_QUOTE_ITEM,
    payload: http.post(`/item/add/${quoteId}`, data),
  });
};

export const editQuoteItem = (itemId, quoteId, item) => {
  store.dispatch({
    type: EDIT_QUOTE_ITEM,
    payload: http.patch(`/item/update/${itemId}/${quoteId}`, item),
  });
};

export const deleteQuoteItem = (itemId, quoteId) => {
  store.dispatch({
    type: DELETE_QUOTE_ITEM,
    payload: http.delete(`/item/delete/${itemId}/${quoteId}`),
  });
};

export const getUnAddedQuotesItems = (quoteId) => {
  store.dispatch({
    type: UN_ADDED_QUOTE_ITEM,
    payload: http.get(`/item/unAdded/${quoteId}`),
  });
};

export const sendQuote = (quoteId) => {
  store.dispatch({
    type: SEND_QUOTE,
    payload: http.patch(`/quote/send/${quoteId}`),
  });
};

export const acceptQuote = (quoteId) => {
  store.dispatch({
    type: ACCEPT_QUOTE,
    payload: http.patch(`/quote/accept/${quoteId}`),
  });
};

export const rejectQuote = (quoteId) => {
  store.dispatch({
    type: REJECT_QUOTE,
    payload: http.patch(`/quote/reject/${quoteId}`),
  });
};

export const updateQuoteDiscount = (quoteId, data) => {
  store.dispatch({
    type: UPDATE_QUOTE_DISCOUNT,
    payload: http.patch(`/quote/discount/${quoteId}`, data),
  });
};

export const createPdf = (quoteId, quote) => {
  store.dispatch({
    type: CREATE_QUOTE_PDF,
    payload: http.post(`/quote/${quoteId}/create-pdf`, quote),
  });
};

export const downloadPdf = (quoteId) => {
  store.dispatch({
    type: DOWNLOAD_QUOTE_PDF,
    payload: http
      .get(`/quote/${quoteId}/download-pdf`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.setAttribute("download", "proposal.pdf");
        a.click();
      }),
  });
};
