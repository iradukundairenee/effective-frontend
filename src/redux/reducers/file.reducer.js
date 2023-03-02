import { baseState } from "../utils/baseStates";
import {
  UPLOAD_ATTR_IMAGE,
  RESET_UPLOAD_A_IMAGE,
  GENERATE_QR,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const attrImageReducer = (state = baseState("fileName", ""), action) => {
  switch (action.type) {
    case pending(UPLOAD_ATTR_IMAGE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPLOAD_ATTR_IMAGE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        fileName: action.payload.data.data,
      };
    }
    case RESET_UPLOAD_A_IMAGE:
      return {
        ...state,
        loaded: false,
        fileName: "",
      };
    case rejected(UPLOAD_ATTR_IMAGE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const qrCodeGeneratorReducer = (state = baseState("qr", ""), action) => {
  switch (action.type) {
    case GENERATE_QR: {
      return {
        ...state,
        loading: false,
        loaded: true,
        qr: action.payload,
      };
    }
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
