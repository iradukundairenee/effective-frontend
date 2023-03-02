import { store } from "../store";
import {
  UPDATE_INVOICE,
  GET_INVOICES,
  GET_INVOICE,
  CREATE_INVOICE_PDF,
  DOWNLOAD_INVOICE_PDF,
  APPLY_COUPON_ON_INVOICE,
  APPLY_POINTS_ON_INVOICE,
  INVOICE_STATUS_AFTER_PAYMENT,
  NOTIFY_INVOICE_PAYMENT,
  RESET_INVOICE,
  RESET_DOWNLOAD_INVOICE,
  RESET_CREATE_INVOICE,
} from "./actionTypes";
import { http } from "utils/http";

export const getInvoices = () => {
  store.dispatch({
    type: GET_INVOICES,
    payload: http.get("/invoice"),
  });
};
export const updateInvoice = (invoiceInfo = {}, invoiceId = "") => {
  const { quoteId, ...rest } = invoiceInfo;
  store.dispatch({
    type: UPDATE_INVOICE,
    payload: http.patch(`/invoice/${invoiceId}`, rest),
  });
};
export const invoiceStatusAfterPayment = (invoiceInfo = {}, invoiceId = "") => {
  const { quoteId, ...rest } = invoiceInfo;
  store.dispatch({
    type: INVOICE_STATUS_AFTER_PAYMENT,
    payload: http.patch(`/invoice/status/${invoiceId}`, rest),
  });
};
export const notifyPaidInvoice = (data = {}) => {
  store.dispatch({
    type: NOTIFY_INVOICE_PAYMENT,
    payload: http.post(`/mail/notifyPaidInvoice`, data),
  });
};
export const getInvoice = (invoiceId) => {
  store.dispatch({
    type: GET_INVOICE,
    payload: http.get(`/invoice/${invoiceId}`),
  });
};
export const createInvoicePdf = (invoiceId, invoice) => {
  store.dispatch({
    type: CREATE_INVOICE_PDF,
    payload: http.post(`/invoice/${invoiceId}/create-invoice`, invoice),
  });
};
export const downloadInvoicePdf = (invoiceId) => {
  store.dispatch({
    type: DOWNLOAD_INVOICE_PDF,
    payload: http
      .get(`/invoice/${invoiceId}/download-invoice`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.setAttribute("download", "invoice.pdf");
        a.click();
      }),
  });
};

export const clearPdfDownloadStates = () => {
  store.dispatch({
    type: RESET_INVOICE,
    payload: null,
  });
  store.dispatch({
    type: RESET_DOWNLOAD_INVOICE,
    payload: null,
  });
  store.dispatch({
    type: RESET_CREATE_INVOICE,
    payload: null,
  });
};

export const applyCouponOnInvoice = (invoiceId = "", data = {}) => {
  store.dispatch({
    type: APPLY_COUPON_ON_INVOICE,
    payload: http.patch(`/invoice/${invoiceId}/applyCoupon`, data),
  });
};

export const applyPointsOnInvoice = (invoiceId = "", data = {}) => {
  store.dispatch({
    type: APPLY_POINTS_ON_INVOICE,
    payload: http.patch(`/invoice/${invoiceId}/applyPoints`, data),
  });
};
