import { baseState } from "../utils/baseStates";
import {
  ADD_NEW_LOG,
  ADD_NEW_PROJECT,
  EDIT_PROJECT,
  ARCHIVE_PROJECT,
  GET_DASHBOARD_COUNTS,
  GET_PROJECTS,
  GET_PROJECT_PROD,
  GET_PROJECT_DETAILS,
  GET_PROJECT_HISTORIES,
  VIEW_CUSTOMER_PROJECT_LIST,
  SINGLE_CUSTOMER_PROJECT_LIST,
  COMPLETE_PROJECT,
} from "../actions/actionTypes";
import { pending, fulfilled, rejected } from "../utils/actions";

export const projectAddReducer = (state = baseState("message", ""), action) => {
  switch (action.type) {
    case pending(ADD_NEW_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_NEW_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ADD_NEW_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const projectEditReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(EDIT_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(EDIT_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(EDIT_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const completeProjectReducer = (
  state = baseState("project", {}),
  action
) => {
  switch (action.type) {
    case pending(COMPLETE_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(COMPLETE_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        project: action.payload.data,
      };
    }
    case rejected(COMPLETE_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const archiveProjectReducer = (
  state = baseState("message", ""),
  action
) => {
  switch (action.type) {
    case pending(ARCHIVE_PROJECT): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ARCHIVE_PROJECT): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: "Success",
      };
    }
    case rejected(ARCHIVE_PROJECT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const projectsGetReducer = (
  state = baseState("projects", []),
  action
) => {
  switch (action.type) {
    case pending(GET_PROJECTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        projects: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const dashboardReducer = (state = baseState("counts", {}), action) => {
  switch (action.type) {
    case pending(GET_DASHBOARD_COUNTS): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_DASHBOARD_COUNTS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        counts: action.payload.data.data,
      };
    }
    case rejected(GET_DASHBOARD_COUNTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const viewCustomerProjectListtReducer = (
  state = baseState("project", []),
  action
) => {
  switch (action.type) {
    case pending(VIEW_CUSTOMER_PROJECT_LIST): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(VIEW_CUSTOMER_PROJECT_LIST): {
      return {
        ...state,
        loading: false,
        loaded: true,
        project: action.payload.data.data,
      };
    }
    case rejected(VIEW_CUSTOMER_PROJECT_LIST):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const viewSingleCustomerProjectListtReducer = (
  state = baseState("singleproject", {}),
  action
) => {
  switch (action.type) {
    case pending(SINGLE_CUSTOMER_PROJECT_LIST): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(SINGLE_CUSTOMER_PROJECT_LIST): {
      return {
        ...state,
        loading: false,
        loaded: true,
        singleproject: action.payload.data.data,
      };
    }
    case rejected(SINGLE_CUSTOMER_PROJECT_LIST):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const historiesGetReducer = (
  state = baseState("histories", []),
  action
) => {
  switch (action.type) {
    case pending(GET_PROJECT_HISTORIES): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECT_HISTORIES): {
      return {
        ...state,
        loading: false,
        loaded: true,
        histories: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECT_HISTORIES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const projectGetReducer = (state = baseState("project", {}), action) => {
  switch (action.type) {
    case pending(GET_PROJECT_DETAILS): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECT_DETAILS): {
      return {
        ...state,
        loading: false,
        loaded: true,
        project: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECT_DETAILS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const logAddReducer = (state = baseState("log", {}), action) => {
  switch (action.type) {
    case pending(ADD_NEW_LOG): {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case fulfilled(ADD_NEW_LOG): {
      return {
        ...state,
        loading: false,
        loaded: true,
        log: action.payload.data.data,
      };
    }
    case rejected(ADD_NEW_LOG):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const getProjectProdsReducer = (
  state = baseState("projectProducts", []),
  action
) => {
  switch (action.type) {
    case pending(GET_PROJECT_PROD): {
      return {
        ...state,
        loading: true,
      };
    }
    case fulfilled(GET_PROJECT_PROD): {
      return {
        ...state,
        loading: false,
        loaded: true,
        projectProducts: action.payload.data.data,
      };
    }
    case rejected(GET_PROJECT_PROD):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
