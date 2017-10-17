import { Map } from 'immutable';

import {
  GET_SECTION_PAGE_START,
  GET_SECTION_PAGE_ERROR,
  GET_SECTION_PAGE_SUCCESS,
  SET_ACTIVE_TAG,
} from './actions.js';

const initialState = Map({
    sectionPageAsyncLoading: false,
    sectionPageAsyncError: null,
    sectionPageAsyncData: null,
    sectionPageSelectedTag: null,
  });

const actionsMap = {
  //Event page data
  [GET_SECTION_PAGE_START]: (state) => {
    return state.merge(Map({
      sectionPageAsyncLoading: true,
      sectionPageAsyncError: null,
      sectionPageAsyncData: null,
    }));
  },
  [GET_SECTION_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({
      sectionPageAsyncLoading: false,
      sectionPageAsyncError: action.data,
    }));
  },
  [GET_SECTION_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      sectionPageAsyncLoading: false,
      sectionPageAsyncData: action.data,
    }));
  },
  [SET_ACTIVE_TAG]: (state, action) => {
    return state.merge(Map({
      sectionPageSelectedTag: action.data,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }