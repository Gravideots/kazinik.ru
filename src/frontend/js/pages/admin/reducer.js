import {Map} from 'immutable';

import {

    ASYNC_START,
    ASYNC_ERROR,
    ASYNC_SUCCESS,


    GET_ADMIN_PAGE_START,
    GET_ADMIN_PAGE_ERROR,
    GET_ADMIN_PAGE_SUCCESS,
    ADMIN_PAGE_UNLOAD,

    GET_POSSIBLE_SECTIONS_LIST_START,
    GET_POSSIBLE_SECTIONS_LIST_SUCCESS,
    GET_POSSIBLE_SECTIONS_LIST_ERROR,

    GET_USERS_LIST_START,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_ERROR,

    SELECT_SECTION_TO_CREATE,

    SELECT_SECTION_TO_EDIT_START,
    SELECT_SECTION_TO_EDIT_SUCCESS,
    SELECT_SECTION_TO_EDIT_ERROR,

    CREATE_NEW_SECTION_START,
    CREATE_NEW_SECTION_SUCCESS,
    CREATE_NEW_SECTION_ERROR,

    SELECT_ADD_CONTENT_TO_SECTION_START,
    SELECT_ADD_CONTENT_TO_SECTION_ERROR,
    SELECT_ADD_CONTENT_TO_SECTION_SUCCESS,

    OPEN_CONTENT_CREATION,
} from './actions.js';

const initialState = Map({asyncLoading: false, asyncLoaded: false, asyncError: null, asyncData: null});

const actionsMap = {


    [ASYNC_START]: (state) => {
        return state.merge(Map({asyncLoading: true, asyncLoaded: false, asyncError: null, asyncData: null}));
    },
    [ASYNC_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: false, asyncError: action.data}));
    },
    [ASYNC_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: true}));
    },

    //Event page data
    [GET_ADMIN_PAGE_START]: (state) => {
        return state.merge(Map({asyncLoading: true, asyncLoaded: false, asyncError: null, asyncData: null}));
    },
    [GET_ADMIN_PAGE_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: false, asyncError: action.data}));
    },
    [GET_ADMIN_PAGE_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: true}));
    },
    [ADMIN_PAGE_UNLOAD]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: false, asyncError: null, asyncData: null}));
    },

    [GET_POSSIBLE_SECTIONS_LIST_START]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: null, asyncError: null}));
    },
    [GET_POSSIBLE_SECTIONS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: action.data, asyncError: null}));
    },
    [GET_POSSIBLE_SECTIONS_LIST_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.data}));
    },

    [GET_USERS_LIST_START]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: null, asyncError: null}));
    },
    [GET_USERS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: action.data, asyncError: null}));
    },
    [GET_USERS_LIST_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.data}));
    },

    [SELECT_SECTION_TO_CREATE]: (state, action) => {
        return state.merge(Map({
            asyncLoading: false,
            asyncData: {
                NewSection: action.data
            },
            asyncError: null
        }));
    },

    [CREATE_NEW_SECTION_START]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: null, asyncError: null}));
    },
    [CREATE_NEW_SECTION_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.data}));
    },

    [SELECT_SECTION_TO_EDIT_START]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: null, asyncError: false}));
    },
    [SELECT_SECTION_TO_EDIT_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: action.data, asyncError: null}));
    },
    [SELECT_SECTION_TO_EDIT_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.data}));
    },
    [SELECT_ADD_CONTENT_TO_SECTION_START]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: null, asyncError: null}));
    },
    [SELECT_ADD_CONTENT_TO_SECTION_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: true, asyncData: action.data, asyncError: null}));
    },
    [SELECT_ADD_CONTENT_TO_SECTION_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.error}));
    },
    [OPEN_CONTENT_CREATION]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: action.data, asyncError: null}));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn
        ? fn(state, action)
        : state;
}