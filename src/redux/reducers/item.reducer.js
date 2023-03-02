import { baseState } from "../utils/baseStates";
import {
  ADD_ITEM,
  GET_ITEMS,
  UPDATE_ITEM
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const addItemReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(ADD_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getItemsReducer = (state = baseState("items", []), action) => {
  switch (action.type) {
    case pending(GET_ITEMS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_ITEMS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.data.data
      };
    }
    case rejected(GET_ITEMS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateItemReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(UPDATE_ITEM): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_ITEM): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(UPDATE_ITEM):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
