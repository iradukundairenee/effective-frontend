import { http } from "utils/http";
import { store } from "../store";
import { ADD_CONVERSATION, GET_PROJECT_CONVERSATIONS } from "./actionTypes";

export const addConversation = (projectId, conversationInfo) => {
  store.dispatch({
    type: ADD_CONVERSATION,
    payload: http.post(`/conversation/add/${projectId}`, conversationInfo),
  });
};
export const getProjectConversation = (projectId) => {
  store.dispatch({
    type: GET_PROJECT_CONVERSATIONS,
    payload: http.get(`/conversation/getProjectConversation/${projectId}`),
  });
};
