import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";
import { GET_ASSET_LOGS, ADD_ASSET_LOGS } from "../actions/actionTypes";

export const logsReducer = (state = baseState("logs", []), action) => {
  switch (action.type) {
    case pending(GET_ASSET_LOGS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_ASSET_LOGS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        logs: action.payload.data.data,
      };
    }
    case rejected(GET_ASSET_LOGS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const addLogsReducer = (state = baseState("newLogs", []), action) => {
  switch (action.type) {
    case pending(ADD_ASSET_LOGS): {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fulfilled(ADD_ASSET_LOGS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        newLogs: action.payload.data,
      };
    }
    case rejected(ADD_ASSET_LOGS):
    default:
      return {
        ...state,
        loading: false,
      }
  }
}
