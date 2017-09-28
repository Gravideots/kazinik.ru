import { Map } from 'immutable';

import {
  GET_SCHOOL_PAGE_START,
  GET_SCHOOL_PAGE_ERROR,
  GET_SCHOOL_PAGE_SUCCESS
} from './actions.js';

const initialState = Map({
    schoolPageAsyncLoading: false,
    schoolPageAsyncError: null,
    schoolPageAsyncData: null
  });

const actionsMap = {
  //Event page data
  [GET_SCHOOL_PAGE_START]: (state) => {
    return state.merge(Map({
      schoolPageAsyncLoading: true,
      schoolPageAsyncError: null,
      schoolPageAsyncData: null,
    }));
  },
  [GET_SCHOOL_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({
      schoolPageAsyncLoading: false,
      schoolPageAsyncError: action.data,
    }));
  },
  [GET_SCHOOL_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      schoolPageAsyncLoading: false,
      schoolPageAsyncData: action.data,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }