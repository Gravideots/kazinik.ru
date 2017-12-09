import api from '../../api';

export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR'

export const GET_SIDE_BAR_CONTENT_START = 'GET_SIDE_BAR_CONTENT_START'
export const GET_SIDE_BAR_CONTENT_ERROR = 'GET_SIDE_BAR_CONTENT_ERROR';
export const GET_SIDE_BAR_CONTENT_SUCCESS = 'GET_SIDE_BAR_CONTENT_SUCCESS';

export const GET_EXISTING_SECTIONS_LIST_START = 'GET_EXISTING_SECTIONS_LIST_START';
export const GET_EXISTING_SECTIONS_LIST_SUCCESS = 'GET_EXISTING_SECTIONS_LIST_SUCCESS';
export const GET_EXISTING_SECTIONS_LIST_ERROR = 'GET_EXISTING_SECTIONS_LIST_ERROR';

export const GET_POSSIBLE_SECTIONS_LIST_START = 'GET_POSSIBLE_SECTIONS_LIST_START';
export const GET_POSSIBLE_SECTIONS_LIST_SUCCESS = 'GET_POSSIBLE_SECTIONS_LIST_SUCCESS';
export const GET_POSSIBLE_SECTIONS_LIST_ERROR = 'GET_POSSIBLE_SECTIONS_LIST_ERROR';

export function toggleSidebar(openFromRight) {
    return {type: TOGGLE_SIDE_BAR, openFromRight: openFromRight};
}

function getSidebarContentStart() {
    return {type: GET_SIDE_BAR_CONTENT_START};
}

function getSidebarContentSuccess(data) {
    return {type: GET_SIDE_BAR_CONTENT_SUCCESS, data};
}

function getSidebarContentError(error) {
    return {type: GET_SIDE_BAR_CONTENT_ERROR, error};
}

export function getSidebarContent() {
    return function (dispatch) {
        dispatch(getSidebarContentStart())
        api
            .getSidebarContent()
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(getSidebarContentSuccess(data.body))
                    })
            })
            .catch(error => dispatch(getSidebarContentError(error)))
    }
}

export function getExistingSectios() {
    return function (dispatch) {
        dispatch(getExistingSectiosStart())
        api
            .getSectionsList("existing")
            // .then(data => {
            //     data
            //         .json()
            //         .then(data => {
            //             dispatch(getExistingSectiosSuccess(data))
            //         })
            // })
            .then(data => dispatch(getExistingSectiosSuccess(data)))
            .catch(error => dispatch(getExistingSectiosError(error)))
    }
}
function getExistingSectiosStart() {
    return {type: GET_EXISTING_SECTIONS_LIST_START};
}
function getExistingSectiosSuccess(data) {
    return {type: GET_EXISTING_SECTIONS_LIST_SUCCESS, data};
}
function getExistingSectiosError(error) {
    return {type: GET_EXISTING_SECTIONS_LIST_ERROR, error};
}