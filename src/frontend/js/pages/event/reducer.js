import { Map } from 'immutable';

import {
  GET_EVENT_PAGE_START,
  GET_EVENT_PAGE_ERROR,
  GET_EVENT_PAGE_SUCCESS
} from './actions.js';

const initialState = Map({
    eventPageAsyncLoading: false,
    eventPageAsyncError: null,
    eventPageAsyncData: null
  });

const actionsMap = {
  //Event page data
  [GET_EVENT_PAGE_START]: (state) => {
    return state.merge(Map({
      eventPageAsyncLoading: true,
      eventPageAsyncError: null,
      eventPageAsyncData: null,
    }));
  },
  [GET_EVENT_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({
      eventPageAsyncLoading: false,
      eventPageAsyncError: action.data,
    }));
  },
  [GET_EVENT_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      eventPageAsyncLoading: false,
      eventPageAsyncData: action.data,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }