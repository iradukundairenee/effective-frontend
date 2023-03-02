import { baseState } from "../utils/baseStates";
import {
  GET_LOYALTY_POINTS,
  ADD_LOYALTY_POINTS,
  GET_SINGLE_LOYALTY_POINT,
  UPDATE_LOYALTY_POINT,
} from "redux/actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const loyaltyPointsGetReducer = (
  state = baseState("loyaltyPoints", []),
  action
) => {
  switch (action.type) {
    case pending(GET_LOYALTY_POINTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_LOYALTY_POINTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        loyaltyPoints: action.payload.data.data,
      };
    }
    case rejected(GET_LOYALTY_POINTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const singleLoyaltyPointGetReducer = (
  state = baseState("loyaltyPoint", []),
  action
) => {
  switch (action.type) {
    case pending(GET_SINGLE_LOYALTY_POINT): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_SINGLE_LOYALTY_POINT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        loyaltyPoint: action.payload.data.data,
      };
    }
    case rejected(GET_SINGLE_LOYALTY_POINT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const loyaltyPointsAddReducer = (
  state = baseState("loyaltyPoint", {}),
  action
) => {
  switch (action.type) {
    case pending(ADD_LOYALTY_POINTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(ADD_LOYALTY_POINTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        loyaltyPoint: action.payload.data.data,
      };
    }
    case rejected(ADD_LOYALTY_POINTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateLoyaltyPointsGetReducer = (
  state = baseState("updatedLoyaltyPoint", []),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_LOYALTY_POINT): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(UPDATE_LOYALTY_POINT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        updatedLoyaltyPoint: action.payload.data.data,
      };
    }
    case rejected(UPDATE_LOYALTY_POINT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
