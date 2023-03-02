import { baseState } from "../utils/baseStates";
import {
  GET_ASSETS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNT,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const notifsGetReducer = (state = baseState("notifs", []), action) => {
  switch (action.type) {
    case pending(GET_NOTIFICATIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_NOTIFICATIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        notifs: action.payload.data.data,
      };
    }
    case rejected(GET_NOTIFICATIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const notifsCountReducer = (state = baseState("count", 0), action) => {
  switch (action.type) {
    case pending(GET_NOTIFICATIONS_COUNT): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_NOTIFICATIONS_COUNT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        count: action.payload.data.data,
      };
    }
    case rejected(GET_NOTIFICATIONS_COUNT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getAssetsReducer = (state = baseState("assets", 0), action) => {
  switch (action.type) {
    case pending(GET_ASSETS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_ASSETS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        assets: action.payload.data.data,
      };
    }
    case rejected(GET_ASSETS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
