import { baseState } from "../utils/baseStates";
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
  GET_LICENSE_AGREEMENT,
  UPDATE_LICENSE_AGREEMENT,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const quoteAddReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(ADD_NEW_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
        proposalId: "",
      };
    }
    case fulfilled(ADD_NEW_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
        proposalId: action.payload.data.data._id,
      };
    }
    case rejected(ADD_NEW_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const addQuoteTaxReducer = (
  state = baseState("addedTax", ""),
  action
) => {
  switch (action.type) {
    case pending(ADD_QUOTE_TAX): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_QUOTE_TAX): {
      return {
        ...state,
        loading: false,
        loaded: true,
        addedTax: Math.random(),
      };
    }
    case rejected(ADD_QUOTE_TAX):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateQuoteTaxReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_QUOTE_TAX): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_QUOTE_TAX): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_QUOTE_TAX):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const deleteQuoteTaxReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DELETE_QUOTE_TAX): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DELETE_QUOTE_TAX): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(DELETE_QUOTE_TAX):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const quoteEditReducer = (
  state = baseState("updatedQuote", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        updatedQuote: Math.random(),
      };
    }
    case rejected(UPDATE_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const quotesGetReducer = (state = baseState("quotes", []), action) => {
  switch (action.type) {
    case pending(GET_QUOTES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_QUOTES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        quotes: action.payload.data.data,
      };
    }
    case rejected(GET_QUOTES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getLicenseAgreementReducer = (
  state = baseState("license", ""),
  action
) => {
  switch (action.type) {
    case pending(GET_LICENSE_AGREEMENT): {
      return {
        ...state,
        loading: true,
      };
    }

    case fulfilled(GET_LICENSE_AGREEMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        license: action.payload.data.data,
      };
    }
    case rejected(GET_LICENSE_AGREEMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const quoteGetReducer = (state = baseState("quote", {}), action) => {
  switch (action.type) {
    case pending(GET_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        quote: action.payload.data.data,
      };
    }
    case rejected(GET_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const addQuoteItemReducer = (
  state = baseState("quoteItem", []),
  action
) => {
  switch (action.type) {
    case pending(ADD_QUOTE_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_QUOTE_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        quote: action.payload.data.data,
      };
    }
    case rejected(ADD_QUOTE_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const unAddedQuoteItemReducer = (
  state = baseState("items", []),
  action
) => {
  switch (action.type) {
    case pending(UN_ADDED_QUOTE_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UN_ADDED_QUOTE_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.data.data,
      };
    }
    case rejected(UN_ADDED_QUOTE_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const quoteItemEditReducer = (
  state = baseState("quoteItem", {}),
  action
) => {
  switch (action.type) {
    case pending(EDIT_QUOTE_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(EDIT_QUOTE_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        quote: action.payload.data.data,
      };
    }
    case rejected(EDIT_QUOTE_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const quoteDeleteItemReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DELETE_QUOTE_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DELETE_QUOTE_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Item deleted",
      };
    }
    case rejected(DELETE_QUOTE_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const sendQuoteReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(SEND_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(SEND_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Quote delivered",
      };
    }
    case rejected(SEND_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const acceptQuoteReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(ACCEPT_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ACCEPT_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Quote Accepted",
      };
    }
    case rejected(ACCEPT_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateProposalTextReducer = (
  state = baseState("updatedProposalText", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_QUOTE_TEXT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_QUOTE_TEXT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        updatedProposalText: Math.random(),
      };
    }
    case rejected(UPDATE_QUOTE_TEXT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateLicenseAgreementReducer = (
  state = baseState("updatedProposalText", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_LICENSE_AGREEMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_LICENSE_AGREEMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        updatedLicenseAgreement: Math.random(),
      };
    }
    case rejected(UPDATE_LICENSE_AGREEMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateQuoteDiscountReducer = (
  state = baseState("updatedQuoteDiscount", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_QUOTE_DISCOUNT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_QUOTE_DISCOUNT): {
      return {
        updatedQuoteDiscount: Math.random(),
      };
    }
    case rejected(UPDATE_QUOTE_DISCOUNT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const rejectQuoteReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(REJECT_QUOTE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(REJECT_QUOTE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Quote rejected",
      };
    }
    case rejected(REJECT_QUOTE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const createQuotePdfReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(CREATE_QUOTE_PDF): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(CREATE_QUOTE_PDF): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "PDF created",
      };
    }
    case rejected(CREATE_QUOTE_PDF):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const downloadQuotePdfReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DOWNLOAD_QUOTE_PDF): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DOWNLOAD_QUOTE_PDF): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "PDF downloaded",
      };
    }
    case rejected(DOWNLOAD_QUOTE_PDF):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
