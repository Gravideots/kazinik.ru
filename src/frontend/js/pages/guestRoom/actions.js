import api from '../../api';

export const GET_GUEST_ROOM_START = 'GET_GUEST_ROOM_START';
export const GET_GUEST_ROOM_ERROR = 'GET_GUEST_ROOM_ERROR';
export const GET_GUEST_ROOM_SUCCESS = 'GET_GUEST_ROOM_SUCCESS';
export const TOOGLE_QUESTION_BUTTON_STATE = 'TOOGLE_QUESTION_BUTTON_STATE';

// Async get Guest Room Structure

function getGuestRoomStart() {
    return {
      type: GET_GUEST_ROOM_START,
    };
  }

function getGuestRoomSuccess(data) {
  return {
    type: GET_GUEST_ROOM_SUCCESS,
    data,
  };
}

function getGuestRoomError(error) {
  return {
    type: GET_GUEST_ROOM_ERROR,
    error,
  };
}

function toogleQuestionButtonState(bool) {
  return {
    type: TOOGLE_QUESTION_BUTTON_STATE,
    bool: bool
  };
}

export function getGuestRoom() {
  return function (dispatch) {
    api.getGuestRoom()
      .then(data => dispatch(getGuestRoomSuccess(data)))
      .catch(error => dispatch(getGuestRoomError(error)));
  };
}

export function sendMessage(message) {
  return function (dispatch) {
    api.sendGuestMessage(message)
      .then(data => dispatch(getGuestRoomSuccess(data)))
      .catch(error => dispatch(getGuestRoomError(error)));
  };
}

export function resizeQuestionButton(bool){
  return function (dispatch) {
    dispatch(toogleQuestionButtonState(bool));
  };
}