import {Map} from 'immutable';

import {
  TEST_ACTION,
  TEST_ASYNC_ACTION_START,
  TEST_ASYNC_ACTION_ERROR,
  TEST_ASYNC_ACTION_SUCCESS,
  GET_MAIN_PAGE_START,
  GET_MAIN_PAGE_ERROR,
  GET_MAIN_PAGE_SUCCESS
} from './actions.js';

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  mainPageAsyncLoading: false,
  mainPageAsyncError: null,
  mainPageAsyncData: null
});

const actionsMap = {
  [TEST_ACTION]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge(Map({counter}));
  },

  // Async action
  [TEST_ASYNC_ACTION_START]: (state) => {
    return state.merge(Map({asyncLoading: true, asyncError: null, asyncData: null}));
  },
  [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge(Map({asyncLoading: false, asyncError: action.data}));
  },
  [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge(Map({asyncLoading: false, asyncData: action.data}));
  },

  //Main page data
  [GET_MAIN_PAGE_START]: (state) => {
    return state.merge(Map({mainPageAsyncLoading: true, mainPageAsyncError: null, mainPageAsyncData: null}));
  },
  [GET_MAIN_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({mainPageAsyncLoading: false, mainPageAsyncError: action.data}));
  },
  [GET_MAIN_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({mainPageAsyncLoading: false, mainPageAsyncData: action.data}));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn
    ? fn(state, action)
    : state;
}
