import { baseState } from "../utils/baseStates";
import {
  GET_SUBSCRIPTIONS,
  ADD_SUBSCRIPTIONS,
  GET_SUBSCRIPTION,
  EDIT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  ADD_SUBSCRIPTION_CUSTOMERS,
  GET_SUBSCRIPTION_CUSTOMERS,
  GET_ALL_SUBSCRIPTIONS,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const subscriptionAddReducer = (
  state = baseState("subscriptions", []),
  action
) => {
  switch (action.type) {
    case pending(ADD_SUBSCRIPTIONS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_SUBSCRIPTIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const subscriptionsGetReducer = (
  state = baseState("subscriptions", []),
  action
) => {
  switch (action.type) {
    case pending(GET_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscriptions: action.payload.data.data,
      };
    }
    case rejected(GET_SUBSCRIPTIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const subscriptionGetReducer = (
  state = baseState("subscription", {}),
  action
) => {
  switch (action.type) {
    case pending(GET_SUBSCRIPTION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_SUBSCRIPTION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscription: action.payload.data.data,
      };
    }
    case rejected(GET_SUBSCRIPTION):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const subscriptionEditReducer = (
  state = baseState("subscription", {}),
  action
) => {
  switch (action.type) {
    case pending(EDIT_SUBSCRIPTION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(EDIT_SUBSCRIPTION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscription: action.payload.data.data,
      };
    }
    case rejected(EDIT_SUBSCRIPTION):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const subscriptiondeleteReducer = (
  state = baseState("subscription", {}),
  action
) => {
  switch (action.type) {
    case pending(DELETE_SUBSCRIPTION): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DELETE_SUBSCRIPTION): {
      return {
        ...state,
        loading: false,
        loaded: true,
        subscription: action.payload.data.data,
      };
    }
    case rejected(DELETE_SUBSCRIPTION):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const addSubscriptionsCustomers = (
  state = baseState("customer", []),
  action
) => {
  switch (action.type) {
    case pending(ADD_SUBSCRIPTION_CUSTOMERS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(ADD_SUBSCRIPTION_CUSTOMERS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        customer: action.payload.data.data,
      };
    }
    case rejected(ADD_SUBSCRIPTION_CUSTOMERS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getSubscriptionsCustomers = (
  state = baseState("customers", []),
  action
) => {
  switch (action.type) {
    case pending(GET_SUBSCRIPTION_CUSTOMERS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_SUBSCRIPTION_CUSTOMERS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        customers: action.payload.data.data,
      };
    }
    case rejected(GET_SUBSCRIPTION_CUSTOMERS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getUserPrivateSubscriptionPlans = (
  state = baseState("allSubscriptions", []),
  action
) => {
  switch (action.type) {
    case pending(GET_ALL_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_ALL_SUBSCRIPTIONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        allSubscriptions: action.payload.data.data,
      };
    }
    case rejected(GET_ALL_SUBSCRIPTIONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
