import { baseState } from "../utils/baseStates";
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
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const invoiceEditReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_INVOICE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_INVOICE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_INVOICE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const invoiceStatusAfterPaymentReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(INVOICE_STATUS_AFTER_PAYMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(INVOICE_STATUS_AFTER_PAYMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(INVOICE_STATUS_AFTER_PAYMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const notifyInvoicePaymentReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(NOTIFY_INVOICE_PAYMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(NOTIFY_INVOICE_PAYMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(NOTIFY_INVOICE_PAYMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const invoicesGetReducer = (
  state = baseState("invoices", []),
  action
) => {
  switch (action.type) {
    case pending(GET_INVOICES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_INVOICES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        invoices: action.payload.data.data,
      };
    }
    case rejected(GET_INVOICES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const invoiceGetReducer = (state = baseState("invoice", {}), action) => {
  switch (action.type) {
    case pending(GET_INVOICE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_INVOICE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        invoice: action.payload.data.data,
      };
    }
    case "RESET_INVOICE": {
      return {
        ...state,
        invoice: {},
        loaded: false,
        loading: false,
      };
    }
    case rejected(GET_INVOICE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const applyCouponOnInvoiceReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(APPLY_COUPON_ON_INVOICE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(APPLY_COUPON_ON_INVOICE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Coupon applied successfully",
      };
    }
    case rejected(APPLY_COUPON_ON_INVOICE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const applyPointsOnInvoiceReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(APPLY_POINTS_ON_INVOICE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(APPLY_POINTS_ON_INVOICE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Coupon applied successfully",
      };
    }
    case rejected(APPLY_POINTS_ON_INVOICE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const createInvoicePdfReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(CREATE_INVOICE_PDF): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(CREATE_INVOICE_PDF): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "PDF created",
      };
    }
    case "RESET_CREATE_INVOICE": {
      return {
        ...state,
        loading: false,
        loaded: false,
        message: "",
      };
    }
    case rejected(CREATE_INVOICE_PDF):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const downloadInvoicePdfReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DOWNLOAD_INVOICE_PDF): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DOWNLOAD_INVOICE_PDF): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "PDF downloaded",
      };
    }
    case "RESET_DOWNLOAD_INVOICE": {
      return {
        ...state,
        loading: false,
        loaded: false,
        message: "",
      };
    }
    case rejected(DOWNLOAD_INVOICE_PDF):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const downloadPdfFromTableReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DOWNLOAD_INVOICE_PDF): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DOWNLOAD_INVOICE_PDF): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "PDF downloaded",
      };
    }
    case rejected(DOWNLOAD_INVOICE_PDF):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
