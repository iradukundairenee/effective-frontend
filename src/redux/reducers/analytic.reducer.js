import {GET_SINGLE_ANALYTIC} from "../actions/actionTypes";
  import { baseState } from "../utils/baseStates";
  import { pending, fulfilled, rejected } from "../utils/actions";
  
  
  export const getSingleAnalyticReducer = (state = baseState("singleAnalytic", []), action) => {
    switch (action.type) {
      case pending(GET_SINGLE_ANALYTIC): {
        return {
          ...state,
          loaded: false,
          loading: true,
        };
      }
      case fulfilled(GET_SINGLE_ANALYTIC): {
        return {
          ...state,
          loading: false,
          loaded: true,
          singleAnalytic: action.payload.data.data
        };
      }
      case rejected(GET_SINGLE_ANALYTIC):
      default:
        return {
          ...state,
          loading: false,
          loaded: false,
        };
    }
  };
  