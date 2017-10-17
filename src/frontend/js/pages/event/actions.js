import api from '../../api';

export const GET_EVENT_PAGE_START = 'GET_EVENT_PAGE_START';
export const GET_EVENT_PAGE_ERROR = 'GET_EVENT_PAGE_ERROR';
export const GET_EVENT_PAGE_SUCCESS = 'GET_EVENT_PAGE_SUCCESS';

// Async get Event Page Structure

function getEventPageStart() {
  return {type: GET_EVENT_PAGE_START};
}

function getEventPageSuccess(data) {
  return {type: GET_EVENT_PAGE_SUCCESS, data};
}

function getEventPageError(error) {
  return {type: GET_EVENT_PAGE_ERROR, error};
}

export function getEventPage(id) {
  return function (dispatch) {
    dispatch(getEventPageStart());

    api
      .eventPage(id)
      .then(data => dispatch(getEventPageSuccess(data)))
      .catch(error => dispatch(getEventPageError(error)));
  };
}