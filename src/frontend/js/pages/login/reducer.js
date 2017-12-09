import { Map } from 'immutable';

import {
  AUTHENTICATION,
  AUTHENTICATION_FAILURE
} from './actions.js';

const initialState = Map({
    authData: null,
    message: null,
    isAuthenticate: false,
});

const actionsMap = {
  //Event page data
  [AUTHENTICATION]: (state, action) => {
    return state.merge(Map({
      authData: action.data,
      isAuthenticate: true,
      message: null
    }));
  },
  [AUTHENTICATION_FAILURE]: (state, action) => {
    return state.merge(Map({
      message: action.data.message,
      isAuthenticate: false,
    }));
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}