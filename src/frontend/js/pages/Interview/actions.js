import api from '../../api';

export const GET_INTERVIEW_PAGE_START = 'GET_INTERVIEW_PAGE_START';
export const GET_INTERVIEW_PAGE_ERROR = 'GET_INTERVIEW_PAGE_ERROR';
export const GET_INTERVIEW_PAGE_SUCCESS = 'GET_INTERVIEW_PAGE_SUCCESS';

// Async get Interview Page Structure

function getInterviewPageStart() {
    return {
      type: GET_INTERVIEW_PAGE_START,
    };
  }

function getInterviewPageSuccess(data) {
  return {
    type: GET_INTERVIEW_PAGE_SUCCESS,
    data,
  };
}

function getInterviewPageError(error) {
  return {
    type: GET_INTERVIEW_PAGE_ERROR,
    error,
  };
}

export function getInterviewPage(id) {
  return function (dispatch) {
    dispatch(getInterviewPageStart());

    api.interviewPage(id)
      .then(data => dispatch(getInterviewPageSuccess(data)))
      .catch(error => dispatch(getInterviewPageError(error)));
  };
}