import api from '../../api';

export const GET_SCHOOL_PAGE_START = 'GET_SCHOOL_PAGE_START';
export const GET_SCHOOL_PAGE_ERROR = 'GET_SCHOOL_PAGE_ERROR';
export const GET_SCHOOL_PAGE_SUCCESS = 'GET_SCHOOL_PAGE_SUCCESS';

// Async get School Page Structure

function getSchoolPageStart() {
    return {
      type: GET_SCHOOL_PAGE_START,
    };
  }

function getSchoolPageSuccess(data) {
  return {
    type: GET_SCHOOL_PAGE_SUCCESS,
    data,
  };
}

function getSchoolPageError(error) {
  return {
    type: GET_SCHOOL_PAGE_ERROR,
    error,
  };
}

export function getSchoolPage(id) {
  return function (dispatch) {
    dispatch(getSchoolPageStart());

    api.schoolPage(id)
      .then(data => dispatch(getSchoolPageSuccess(data)))
      .catch(error => dispatch(getSchoolPageError(error)));
  };
}