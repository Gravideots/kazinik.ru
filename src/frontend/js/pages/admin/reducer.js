import {Map} from 'immutable';

import {
    GET_ADMIN_PAGE_START,
    GET_ADMIN_PAGE_ERROR,
    GET_ADMIN_PAGE_SUCCESS,

    GET_POSSIBLE_SECTIONS_LIST_START,
    GET_POSSIBLE_SECTIONS_LIST_SUCCESS,
    GET_POSSIBLE_SECTIONS_LIST_ERROR,

    SELECT_SECTION_TO_CREATE,

    CREATE_NEW_SECTION_START,
    CREATE_NEW_SECTION_SUCCESS,
    CREATE_NEW_SECTION_ERROR
} from './actions.js';

const initialState = Map({asyncLoading: false, asyncLoaded: false, asyncError: null, asyncData: null});

const actionsMap = {
    //Event page data
    [GET_ADMIN_PAGE_START]: (state) => {
        return state.merge(Map({asyncLoading: true, asyncLoaded: false, asyncError: null, asyncData: null}));
    },
    [GET_ADMIN_PAGE_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: false, asyncError: action.data}));
    },
    [GET_ADMIN_PAGE_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncLoaded: true, asyncData: action.data}));
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

    [SELECT_SECTION_TO_CREATE]: (state, action) => {
        return state.merge(Map({
            asyncLoading: false,
            asyncData: {
                NewSection: action
            },
            asyncError: null
        }));
    },

    [CREATE_NEW_SECTION_START]: (state, action) => {
        return state.merge(Map({
            asyncLoading: true,
            asyncData: {
                NewSection: action
            },
            asyncError: null
        }));
    },
    [CREATE_NEW_SECTION_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: null, asyncError: action.data}));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn
        ? fn(state, action)
        : state;
}