import {
  CREATE_CURRENCY,
  GET_ALL_CURRENCY,
  COUNT_CURRENCY,
  GET_SINGLE_CURRENCY,
  UPDATE_CURRENCY,
  USER_CURRENCY,
} from "../actions/actionTypes";
import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";

export const createCurrencyReducer = (
  state = baseState("currency", {}),
  action
) => {
  switch (action.type) {
    case pending(CREATE_CURRENCY): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(CREATE_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(CREATE_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const getSingleCurrencyReducer = (
  state = baseState("currency", {}),
  action
) => {
  switch (action.type) {
    case pending(GET_SINGLE_CURRENCY): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_SINGLE_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        currency: action.payload.data.currency,
      };
    }
    case rejected(GET_SINGLE_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const updateCurrencyReducer = (
  state = baseState("currency", {}),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_CURRENCY): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const getAllCurrencyReducer = (
  state = baseState("currencies", []),
  action
) => {
  switch (action.type) {
    case pending(GET_ALL_CURRENCY): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_ALL_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        currencies: action.payload.data.data,
      };
    }
    case rejected(GET_ALL_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const countCurrencyReducer = (state = baseState("count", 0), action) => {
  switch (action.type) {
    case pending(COUNT_CURRENCY): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(COUNT_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        count: action.payload.data.data,
      };
    }
    case rejected(COUNT_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getCurrencyByUserReducer = (
  state = baseState("currency", {}),
  action
) => {
  switch (action.type) {
    case pending(USER_CURRENCY): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_CURRENCY): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userCurrency: action.payload.data.data,
      };
    }
    case rejected(USER_CURRENCY):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};
