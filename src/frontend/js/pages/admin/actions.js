import api from '../../api'

export const GET_ADMIN_PAGE_START = 'GET_ADMIN_PAGE_START'
export const GET_ADMIN_PAGE_ERROR = 'GET_ADMIN_PAGE_ERROR'
export const GET_ADMIN_PAGE_SUCCESS = 'GET_ADMIN_PAGE_SUCCESS'

export const GET_POSSIBLE_SECTIONS_LIST_START = 'GET_POSSIBLE_SECTIONS_LIST_START'
export const GET_POSSIBLE_SECTIONS_LIST_SUCCESS = 'GET_POSSIBLE_SECTIONS_LIST_SUCCESS'
export const GET_POSSIBLE_SECTIONS_LIST_ERROR = 'GET_POSSIBLE_SECTIONS_LIST_ERROR'

export const GET_EXISTING_SECTIONS_LIST_START = 'GET_EXISTING_SECTIONS_LIST_START';
export const GET_EXISTING_SECTIONS_LIST_SUCCESS = 'GET_EXISTING_SECTIONS_LIST_SUCCESS';
export const GET_EXISTING_SECTIONS_LIST_ERROR = 'GET_EXISTING_SECTIONS_LIST_ERROR';

export const SELECT_SECTION_TO_CREATE = 'SELECT_SECTION_TO_CREATE'

export const CREATE_NEW_SECTION_START = 'CREATE_NEW_SECTION_START'
export const CREATE_NEW_SECTION_ERROR = 'CREATE_NEW_SECTION_ERROR'
export const CREATE_NEW_SECTION_SUCCESS = 'CREATE_NEW_SECTION_SUCCESS'

export const DELETE_SECTION_START = 'DELETE_SECTION_START'
export const DELETE_SECTION_ERROR = 'DELETE_SECTION_ERROR'
export const DELETE_SECTION_SUCCESS = 'DELETE_SECTION_SUCCESS'

function getAdminPageStart() {
    return {type: GET_ADMIN_PAGE_START}
}
function getAdminPageSuccess(data) {
    return {type: GET_ADMIN_PAGE_SUCCESS, data}
}
function getAdminPageError(error) {
    return {type: GET_ADMIN_PAGE_ERROR, error}
}
export function getAdminPage() {
    return function (dispatch) {
        dispatch(getAdminPageSuccess());
    };
}

function getPossibleSectionsListStart(data) {
    return {type: GET_POSSIBLE_SECTIONS_LIST_START};
}
function getPossibleSectionsListSuccess(data) {
    return {type: GET_POSSIBLE_SECTIONS_LIST_SUCCESS, data};
}
function getPossibleSectionsListError(data) {
    return {type: GET_POSSIBLE_SECTIONS_LIST_ERROR};
}
export function getPossibleSectiosList() {
    console.log("getPossibleSectiosList")
    return function (dispatch) {
        dispatch(getPossibleSectionsListStart())
        api
            .getSectionsList("possible")
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(getPossibleSectionsListSuccess(data))
                    });
            })
            .catch(error => dispatch(getPossibleSectionsListError(error)));
    };
}

export function selectSectionToCreate(data) {
    return {type: SELECT_SECTION_TO_CREATE, data}
}

export function createNewSection(sectionData, sectionType) {
    return function (dispatch) {
        dispatch(createNewSectionStart());

        let newSectionData = {
            sectionData,
            sectionType
        }

        api
            .createNewSection(newSectionData)
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(createNewSectionSuccess(data.body))
                        dispatch(getExistingSectios())
                        dispatch(getPossibleSectiosList())
                    });
            })
            .catch(error => {
                dispatch(createNewSectionError(error))
            });
    };
}
function createNewSectionStart() {
    return {type: CREATE_NEW_SECTION_START}
}
function createNewSectionSuccess(sectionType) {
    return {type: CREATE_NEW_SECTION_SUCCESS, sectionType}
}
function createNewSectionError(error) {
    return {type: CREATE_NEW_SECTION_ERROR, error}
}

export function getExistingSectios() {
    return function (dispatch) {
        dispatch(getExistingSectiosStart())
        api
            .getSectionsList('existing')
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(getExistingSectiosSuccess(data))
                    })
            })
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

export function deleteSection(sectionID) {
    return function (dispatch) {
        dispatch(deleteSectionStart())
        api
            .deleteSection(sectionID)
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(deleteSectionSuccess(data))
                        dispatch(getExistingSectios())
                        dispatch(getPossibleSectiosList())
                    })
            })
            .catch(error => dispatch(deleteSectionError(error)))
    }
}
function deleteSectionStart() {
    return {type: DELETE_SECTION_START}
}

function deleteSectionError() {
    return {type: DELETE_SECTION_ERROR}
}

function deleteSectionSuccess() {
    return {type: DELETE_SECTION_SUCCESS}
}