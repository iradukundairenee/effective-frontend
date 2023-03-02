import { baseState } from "../utils/baseStates";
import {
  START_SESSION,
  END_SESSION,
  GET_SESSIONS_BY_USER,
  SELECTED_SESSION,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const sessionReducer = (state = baseState, action) => {
  switch (action.type) {
    case pending(START_SESSION):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(START_SESSION):
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case rejected(START_SESSION):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case pending(END_SESSION):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(END_SESSION):
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case rejected(END_SESSION):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sessionsByUserReducer = (
  state = baseState("sessions", []),
  action
) => {
  switch (action.type) {
    case pending(GET_SESSIONS_BY_USER):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(GET_SESSIONS_BY_USER):
      return {
        ...state,
        loading: false,
        sessions: action.payload.data.sessions,
      };
    case rejected(GET_SESSIONS_BY_USER):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const selectedSessionReducer = (
  state = baseState("index", 0),
  action
) => {
  switch (action.type) {
    case SELECTED_SESSION:
      return {
        ...state,
        index: action.payload,
      };
    default:
      return state;
  }
};
