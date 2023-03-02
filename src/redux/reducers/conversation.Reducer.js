import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";
import {
  ADD_CONVERSATION,
  GET_PROJECT_CONVERSATIONS,
} from "../actions/actionTypes";

export const conversationAddReducer = (
  state = baseState("conversationChange", ""),
  action
) => {
  switch (action.type) {
    case pending(ADD_CONVERSATION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_CONVERSATION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        conversationChange: Math.random(),
      };
    }
    case rejected(ADD_CONVERSATION):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const conversationGetReducer = (
  state = baseState("conversation"),
  action
) => {
  switch (action.type) {
    case pending(GET_PROJECT_CONVERSATIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECT_CONVERSATIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        conversation: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECT_CONVERSATIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
