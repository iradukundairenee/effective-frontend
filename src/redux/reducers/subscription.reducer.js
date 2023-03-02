import { GET_CURRENT_SUBSCRIPTION, SUBSCRIBE, SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN, VIEW_CUSTOMERS_SUBSCRIPTIONS } from "../actions/actionTypes";
import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";

export const subscribeReducer = (
  state = baseState("subscriptions", {}),
  action
) => {
  switch (action.type) {
    case pending(SUBSCRIBE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(SUBSCRIBE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(SUBSCRIBE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const currentSubscriptionReducer = (
  state = baseState("subscriptions", {}),
  action
) => {
  switch (action.type) {
    case pending(GET_CURRENT_SUBSCRIPTION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_CURRENT_SUBSCRIPTION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscription: action.payload.data.current[0],
      };
    }
    case rejected(GET_CURRENT_SUBSCRIPTION):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};


export const subscribeOrChangeSubscriptionReducer = (
  state = baseState("changeSubscription", {}),
  action
) => {
  switch (action.type) {
    case pending(SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN): {
      return {
        ...state,
        loading: false,
        loaded: true,
        changeSubscription: action.payload.data.data,
      };
    }
    case rejected(SUBSCRIBE_OR_CHANGE_SUBSCRIPTIONPLAN):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};


export const viewCustomersSubscriptionsReducer = (
  state = baseState("customersub", []),
  action
) => {
  switch (action.type) {
    case pending(VIEW_CUSTOMERS_SUBSCRIPTIONS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(VIEW_CUSTOMERS_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        customersub: action.payload.data.current,
      };
    }
    case rejected(VIEW_CUSTOMERS_SUBSCRIPTIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
