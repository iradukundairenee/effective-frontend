import { http } from "utils/http";
import { store } from "../store";
import {
    ADD_COMMENT,
    GET_QUOTE_COMMENTS,
  } from "./actionTypes";


  export const addComment = (commentInfo, quoteId) => {
    store.dispatch({
      type:ADD_COMMENT,
      payload: http.post(`/comment/add/${quoteId}`, commentInfo),
    });
  };
  export const getQuoteComments = (quoteId) => {
    store.dispatch({
      type:GET_QUOTE_COMMENTS,
      payload: http.get(`/comment/getSingleComment/${quoteId}`),
    });
  };

 

 

