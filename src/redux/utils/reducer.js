import { pending, fulfilled, rejected } from "./actions";
import { baseState } from "./baseStates";

const returnData = (type = "string") => {
  const types = {
    string: "",
    object: {},
    array: [],
  };
  return types[type];
};

/**
 *
 * @param {String} actionType
 * @param {String} dataKey
 * @param {String} dataType
 * @param {Boolean} clearAtPending
 * @param {String} searchKey The key that holds data
 * @returns {Object} state
 */
export const promisedReducer =
  (
    actionType = "",
    dataKey = "state",
    dataType = "string",
    clearAtPending = false,
    searchKey = "data"
  ) =>
  (state = baseState(dataKey, returnData(dataType)), action) => {
    switch (action.type) {
      case pending(actionType):
        let theState = { ...state, loaded: false, loading: true };
        if (clearAtPending) {
          theState = { ...theState, [dataKey]: returnData(dataType) };
        }
        return theState;
      case fulfilled(actionType):
        return {
          ...state,
          loading: false,
          loaded: true,
          [dataKey]: action.payload.data[searchKey],
        };
      case rejected(actionType):
      default:
        return {
          ...state,
          loading: false,
        };
    }
  };
