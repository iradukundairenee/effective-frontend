import {
  CREATE_PAYMENT_SESSION,
  GENERATE_POINTS,
  GET_SESSION_ON_SUCCESS_PAYMENT,
  NOTIFY_PAYMENT,
} from "redux/actions/actionTypes";
import { fulfilled, pending, rejected } from "redux/utils";
import { baseState } from "redux/utils/baseStates";

export const paymentSessionReducer = (
  state = baseState("session", ""),
  action
) => {
  switch (action.type) {
    case pending(CREATE_PAYMENT_SESSION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(CREATE_PAYMENT_SESSION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        session: action.payload.data.data,
      };
    }
    case rejected(CREATE_PAYMENT_SESSION):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const notifyPaymentReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(NOTIFY_PAYMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(NOTIFY_PAYMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Email sent",
      };
    }
    case rejected(NOTIFY_PAYMENT):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const generatePointsReducer = (
  state = baseState("points", ""),
  action
) => {
  switch (action.type) {
    case pending(GENERATE_POINTS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GENERATE_POINTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        points: action.payload.data,
      };
    }
    case rejected(GENERATE_POINTS):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const getSessionOnSuccessReducer = (
  state = baseState("session", ""),
  action
) => {
  switch (action.type) {
    case pending(GET_SESSION_ON_SUCCESS_PAYMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_SESSION_ON_SUCCESS_PAYMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        session: action.payload.data.data,
      };
    }
    case rejected(GET_SESSION_ON_SUCCESS_PAYMENT):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};
