import api from '../../api';

export const TEST_ACTION = 'TEST_ACTION';

export const TEST_ASYNC_ACTION_START = 'TEST_ASYNC_ACTION_START';
export const TEST_ASYNC_ACTION_ERROR = 'TEST_ASYNC_ACTION_ERROR';
export const TEST_ASYNC_ACTION_SUCCESS = 'TEST_ASYNC_ACTION_SUCCESS';

export const GET_MAIN_PAGE_START = 'GET_MAIN_PAGE_START';
export const GET_MAIN_PAGE_ERROR = 'GET_MAIN_PAGE_ERROR';
export const GET_MAIN_PAGE_SUCCESS = 'GET_MAIN_PAGE_SUCCESS';

// Test action

export function testAction() {
  return {
    type: TEST_ACTION,
  };
}

// Async action example

function testAsyncStart() {
  return {
    type: TEST_ASYNC_ACTION_START,
  };
}

function testAsyncSuccess(data) {
  return {
    type: TEST_ASYNC_ACTION_SUCCESS,
    data,
  };
}

function testAsyncError(error) {
  return {
    type: TEST_ASYNC_ACTION_ERROR,
    error,
  };
}

export function testAsync() {
  return function (dispatch) {
    dispatch(testAsyncStart());

    api.testAsync()
      .then(data => dispatch(testAsyncSuccess(data)))
      .catch(error => dispatch(testAsyncError(error)));
  };
}

// Async get Main Page Structure

function getMainPageStart() {
  return {
    type: GET_MAIN_PAGE_START,
  };
}

function getMainPageSuccess(data) {
  return {
    type: GET_MAIN_PAGE_SUCCESS,
    data,
  };
}

function getMainPageError(error) {
  return {
    type: GET_MAIN_PAGE_ERROR, 
    error,
  };
}

export function getMainPage() {
  return function (dispatch) {
    dispatch(getMainPageStart());

    api.mainPage()
      .then(data => dispatch(getMainPageSuccess(data)))
      .catch(error => dispatch(getMainPageError(error)));
  };
}
