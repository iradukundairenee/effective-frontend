import { baseState } from "../utils/baseStates";
import {
  USER_REGISTER,
  USER_SIGNIN,
  USER_LIST,
  SET_PASSWORD,
  VALIDATE_RESET_TOKEN,
  USER_SIGNOUT,
  USER_UPDATE,
  USER_DELETE,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  SEND_LINK,
  CHANGE_PASSWORD,
  UPDATE_USER_PROFILE,
  ADMIN_GET_USERS,
  ADD_DOMAIN_NAMES,
  GET_DOMAIN_NAMES,
  END_SESSION,
  GET_SINGLE_USER,
  RESET_UPDATE_PROFILE,
  RESET_UPDATE_USER_PROFILE,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const loginReducer = (
  state = baseState("userInfo", { user: {} }),
  action
) => {
  switch (action.type) {
    case pending(USER_SIGNIN): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(USER_SIGNIN): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case USER_SIGNOUT: {
      return {
        ...state,
        loaded: false,
        userInfo: { user: [] },
      };
    }
    case END_SESSION: {
      return {
        ...state,
        loaded: false,
        userInfo: { user: [] },
      };
    }
    case rejected(USER_SIGNIN):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getSingleUserReducer = (state = baseState("user", {}), action) => {
  switch (action.type) {
    case pending(GET_SINGLE_USER): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_SINGLE_USER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.payload.data.data,
      };
    }
    case rejected(GET_SINGLE_USER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const registerReducer = (state = baseState("userInfo", {}), action) => {
  switch (action.type) {
    case pending(USER_REGISTER): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_REGISTER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case rejected(USER_REGISTER):
    default:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
  }
};
export const usersListReducer = (state = baseState("users", []), action) => {
  switch (action.type) {
    case pending(USER_LIST): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(USER_LIST): {
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload.data.data,
      };
    }
    case rejected(USER_LIST):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const adminGetUsersReducer = (
  state = baseState("users", []),
  action
) => {
  switch (action.type) {
    case pending(ADMIN_GET_USERS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(ADMIN_GET_USERS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload.data.data,
      };
    }
    case rejected(ADMIN_GET_USERS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const validateResetTokenReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(VALIDATE_RESET_TOKEN): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(VALIDATE_RESET_TOKEN): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    }
    case rejected(VALIDATE_RESET_TOKEN):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const setPasswordReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(SET_PASSWORD): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(SET_PASSWORD): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(SET_PASSWORD):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userEditReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(USER_UPDATE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_UPDATE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    }
    case rejected(USER_UPDATE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userDeleteReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(USER_DELETE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(USER_DELETE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    }
    case rejected(USER_DELETE):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const profileEditReducer = (
  state = baseState("userInfo", { user: {} }),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_PROFILE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_PROFILE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case rejected(UPDATE_PROFILE):
    default:
      return {
        ...state,
        loading: false,
      };
    case RESET_UPDATE_PROFILE:
      return {
        ...state,
        loaded: false,
      };
  }
};
export const userProfileEditReducer = (
  state = baseState("userInfo", { user: {} }),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_USER_PROFILE): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(UPDATE_USER_PROFILE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        userInfo: action.payload.data.data,
      };
    }
    case rejected(UPDATE_USER_PROFILE):
    default:
      return {
        ...state,
        loading: false,
      };
    case RESET_UPDATE_USER_PROFILE:
      return {
        ...state,
        loaded: false,
      };
  }
};
export const sendLinkReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(SEND_LINK): {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case fulfilled(SEND_LINK): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(SEND_LINK):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const resetPasswordReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(RESET_PASSWORD): {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case fulfilled(RESET_PASSWORD): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(RESET_PASSWORD):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const changePassword = (
  state = baseState({ passwordChanged: false }),
  action
) => {
  switch (action.type) {
    case fulfilled(CHANGE_PASSWORD): {
      return {
        ...state,
        passwordChanged: true,
        loading: false,
      };
    }
    case pending(CHANGE_PASSWORD): {
      return {
        ...state,
        loading: true,
      };
    }
    case rejected(CHANGE_PASSWORD):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const addUserDomainNamesReducer = (
  state = baseState("domain_names", null),
  action
) => {
  switch (action.type) {
    case pending(ADD_DOMAIN_NAMES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(ADD_DOMAIN_NAMES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        domain: action.payload.data,
      };
    }
    case rejected(ADD_DOMAIN_NAMES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const getUserDomainNamesReducer = (
  state = baseState("domain_names", []),
  action
) => {
  switch (action.type) {
    case pending(GET_DOMAIN_NAMES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_DOMAIN_NAMES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        domains: action.payload.data.data,
      };
    }
    case rejected(GET_DOMAIN_NAMES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
