import {Map} from 'immutable';

import {
    TOGGLE_SIDE_BAR,

    GET_SIDE_BAR_CONTENT_START,
    GET_SIDE_BAR_CONTENT_SUCCESS,
    GET_SIDE_BAR_CONTENT_ERROR,

    GET_POSSIBLE_SECTIONS_LIST_START,
    GET_POSSIBLE_SECTIONS_LIST_SUCCESS,
    GET_POSSIBLE_SECTIONS_LIST_ERROR,

    GET_EXISTING_SECTIONS_LIST_START,
    GET_EXISTING_SECTIONS_LIST_SUCCESS,
    GET_EXISTING_SECTIONS_LIST_ERROR
} from './actions.js';

const initialState = Map({
    fixed: false,
    show: false,
    openFromRight: false,
    asyncLoading: false,
    asyncError: null,
    asyncData: null
});

const actionsMap = {

    [TOGGLE_SIDE_BAR]: (state, action) => {
        const show = state.get('show');

        return state.merge(Map({
            show: !show,
            openFromRight: action.openFromRight
        }));
    },

    [GET_SIDE_BAR_CONTENT_START]: (state) => {
        return state.merge(Map({asyncLoading: true, asyncError: null, asyncData: null}));
    },
    [GET_SIDE_BAR_CONTENT_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncData: action.data}));
    },
    [GET_SIDE_BAR_CONTENT_ERROR]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncError: action.data}));
    },

    [GET_EXISTING_SECTIONS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({asyncLoading: false, asyncError: null, asyncData: action.data}));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn
        ? fn(state, action)
        : state;
}