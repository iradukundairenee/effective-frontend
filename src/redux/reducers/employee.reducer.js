import { baseState } from "../utils/baseStates";
import { GET_CRM_EMPLOYEES } from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const employeesGetReducer = (
  state = baseState("employees", []),
  action
) => {
  switch (action.type) {
    case pending(GET_CRM_EMPLOYEES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_CRM_EMPLOYEES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        employees: action.payload.data.data,
      };
    }

    case rejected(GET_CRM_EMPLOYEES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
