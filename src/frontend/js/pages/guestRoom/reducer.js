import { Map } from 'immutable';

import {
  GET_GUEST_ROOM_START,
  GET_GUEST_ROOM_ERROR,
  GET_GUEST_ROOM_SUCCESS,
} from './actions.js';

const initialState = Map({
    guestRoomAsyncLoading: false,
    guestRoomAsyncError: null,
    guestRoomAsyncData: null,
    guestRoomSelectedTag: null
  });

const actionsMap = {
  //Event page data
  [GET_GUEST_ROOM_START]: (state) => {
    return state.merge(Map({
      guestRoomAsyncLoading: true,
      guestRoomAsyncError: null,
      guestRoomAsyncData: null,
    }));
  },
  [GET_GUEST_ROOM_ERROR]: (state, action) => {
    return state.merge(Map({
      guestRoomAsyncLoading: false,
      guestRoomAsyncError: action.data,
    }));
  },
  [GET_GUEST_ROOM_SUCCESS]: (state, action) => {
    return state.merge(Map({
      guestRoomAsyncLoading: false,
      guestRoomAsyncData: action.data,
    }));
  },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }