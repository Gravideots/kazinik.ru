import { Map } from 'immutable';

import {
  GET_NOTE_PAGE_START,
  GET_NOTE_PAGE_ERROR,
  GET_NOTE_PAGE_SUCCESS
} from './actions.js';

const initialState = Map({
    notePageAsyncLoading: false,
    notePageAsyncError: null,
    notePageAsyncData: null
  });

const actionsMap = {
  //Event page data
  [GET_NOTE_PAGE_START]: (state) => {
    return state.merge(Map({
      notePageAsyncLoading: true,
      notePageAsyncError: null,
      notePageAsyncData: null,
    }));
  },
  [GET_NOTE_PAGE_ERROR]: (state, action) => {
    return state.merge(Map({
      notePageAsyncLoading: false,
      notePageAsyncError: action.data,
    }));
  },
  [GET_NOTE_PAGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      notePageAsyncLoading: false,
      notePageAsyncData: action.data,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }