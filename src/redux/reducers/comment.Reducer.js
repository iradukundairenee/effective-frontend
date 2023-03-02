
import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";
import { ADD_COMMENT, GET_QUOTE_COMMENTS } from "../actions/actionTypes";
export const commentAddReducer = (state = baseState("commentAdded", ""), action) => {
  switch (action.type) {
    case pending(ADD_COMMENT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_COMMENT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        commentAdded: Math.random(),
      };
    }
    case rejected(ADD_COMMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};


export const commentsGetReducer = (state = baseState("comment"), action) => {
  switch (action.type) {
    case pending(GET_QUOTE_COMMENTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_QUOTE_COMMENTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        comment: action.payload.data.data,

      };
    }
    case rejected(GET_QUOTE_COMMENTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

