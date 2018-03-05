import api from '../../api';

export const GET_SECTION_PAGE_START = 'GET_SECTION_PAGE_START';
export const GET_SECTION_PAGE_ERROR = 'GET_SECTION_PAGE_ERROR';
export const GET_SECTION_PAGE_SUCCESS = 'GET_SECTION_PAGE_SUCCESS';
export const SET_ACTIVE_TAG = 'SET_ACTIVE_TAG';

// Async get Section Page Structure

function getSectionPageStart() {
    return {
      type: GET_SECTION_PAGE_START,
    };
  }

function getSectionPageSuccess(data) {
  return {
    type: GET_SECTION_PAGE_SUCCESS,
    data,
  };
}

function getSectionPageError(error) {
  return {
    type: GET_SECTION_PAGE_ERROR,
    error,
  };
}

function getSectionPageTag(data) {
  return {
    type: SET_ACTIVE_TAG,
    data,
  };
}

export function tagSelected(type, tag) {
  return function (dispatch) {
    dispatch(getSectionPageTag(tag))

    api.sectionPage(type, tag)
      .then(data => dispatch(getSectionPageSuccess(data)))
      .catch(error => dispatch(getSectionPageError(error)));

  };
}

export function getSectionPage(type) {
  return function (dispatch) {
    dispatch(getSectionPageStart());

    api.sectionPage(type)
      .then(data => dispatch(getSectionPageSuccess(data)))
      .catch(error => dispatch(getSectionPageError(error)));
  };
}