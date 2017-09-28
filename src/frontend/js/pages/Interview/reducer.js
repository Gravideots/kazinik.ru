import { Map } from 'immutable';

import {
  GET_INTERVIEW_PAGE_START,
  GET_INTERVIEW_PAGE_ERROR,
  GET_INTERVIEW_PAGE_SUCCESS
} from './actions.js';

const initialState = Map({
    interviewPageAsyncLoading: false,
    interviewPageAsyncError: null,
    interviewPageAsyncData: null
  });

const actionsMap = {
  //Event page data
  [GET_INTERVIEW_PAGE_START]: (state) => {
    return state.merge(Map({
      interviewPageAsyncLoading: true,
      interviewPageAsyncError: null,
      interviewPageAsyncData: null,
    }));
  },
  [GET_INTERVIEW_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({
      interviewPageAsyncLoading: false,
      interviewPageAsyncError: action.data,
    }));
  },
  [GET_INTERVIEW_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      interviewPageAsyncLoading: false,
      interviewPageAsyncData: action.data,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }