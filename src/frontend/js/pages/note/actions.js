import api from '../../api';

export const GET_NOTE_PAGE_START = 'GET_NOTE_PAGE_START';
export const GET_NOTE_PAGE_ERROR = 'GET_NOTE_PAGE_ERROR';
export const GET_NOTE_PAGE_SUCCESS = 'GET_NOTE_PAGE_SUCCESS';

// Async get Note Page Structure

function getNotePageStart() {
    return {
      type: GET_NOTE_PAGE_START,
    };
  }

function getNotePageSuccess(data) {
  return {
    type: GET_NOTE_PAGE_SUCCESS,
    data,
  };
}

function getNotePageError(error) {
  return {
    type: GET_NOTE_PAGE_ERROR,
    error,
  };
}

export function getNotePage(id) {
  return function (dispatch) {
    dispatch(getNotePageStart());

    api.notePage(id)
      .then(data => dispatch(getNotePageSuccess(data)))
      .catch(error => dispatch(getNotePageError(error)));
  };
}