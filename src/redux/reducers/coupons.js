import { baseState } from "../utils/baseStates";
import { pending, fulfilled, rejected } from "../utils/actions";
import {
  ADD_COUPON_ON_CUSTOMER,
  CREATE_COUPON,
  DELETE_COUPON_ON_CUSTOMER,
  GET_ALL_COUPONS,
  GET_CLIENT_COUPONS,
  GET_SINGLE_COUPON,
  GET_SINGLE_COUPON_CUSTOMERS,
  UPDATE_COUPON,
} from "redux/actions/actionTypes";

export const createCouponReducer = (
  state = baseState("coupon", ""),
  action
) => {
  switch (action.type) {
    case pending(CREATE_COUPON): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(CREATE_COUPON): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(CREATE_COUPON):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const addCouponOnCustomerReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(ADD_COUPON_ON_CUSTOMER): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_COUPON_ON_CUSTOMER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_COUPON_ON_CUSTOMER):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const deleteCouponOnCustomerReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(DELETE_COUPON_ON_CUSTOMER): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(DELETE_COUPON_ON_CUSTOMER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(DELETE_COUPON_ON_CUSTOMER):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};

export const getAllCouponsReducer = (
  state = baseState("coupon", ""),
  action
) => {
  switch (action.type) {
    case pending(GET_ALL_COUPONS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_ALL_COUPONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        coupons: action.payload.data.coupons,
      };
    }
    case rejected(GET_ALL_COUPONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getCouponReducer = (state = baseState("coupon", ""), action) => {
  switch (action.type) {
    case pending(GET_SINGLE_COUPON): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_SINGLE_COUPON): {
      return {
        ...state,
        loading: false,
        loaded: true,
        coupon: action.payload.data.coupon,
      };
    }
    case rejected(GET_SINGLE_COUPON):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getCouponCustomersReducer = (
  state = baseState("customers", ""),
  action
) => {
  switch (action.type) {
    case pending(GET_SINGLE_COUPON_CUSTOMERS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_SINGLE_COUPON_CUSTOMERS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        customers: action.payload.data.customers,
      };
    }
    case rejected(GET_SINGLE_COUPON_CUSTOMERS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getClientCouponsReducer = (
  state = baseState("coupon", ""),
  action
) => {
  switch (action.type) {
    case pending(GET_CLIENT_COUPONS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_CLIENT_COUPONS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        coupons: action.payload.data.data,
      };
    }
    case rejected(GET_CLIENT_COUPONS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const updateCouponReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_COUPON): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_COUPON): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Updated successfully",
      };
    }
    case rejected(UPDATE_COUPON):
    default:
      return {
        ...state,
        loaded: false,
        loading: false,
      };
  }
};
