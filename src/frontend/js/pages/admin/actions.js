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

export const SELECT_SECTION_TO_EDIT_START = 'SELECT_SECTION_TO_EDIT_START'
export const SELECT_SECTION_TO_EDIT_SUCCESS = 'SELECT_SECTION_TO_EDIT_SUCCESS'
export const SELECT_SECTION_TO_EDIT_ERROR = 'SELECT_SECTION_TO_EDIT_ERROR'

export const CREATE_NEW_SECTION_START = 'CREATE_NEW_SECTION_START'
export const CREATE_NEW_SECTION_ERROR = 'CREATE_NEW_SECTION_ERROR'
export const CREATE_NEW_SECTION_SUCCESS = 'CREATE_NEW_SECTION_SUCCESS'

export const UPDATE_SECTION_START = 'CREATE_NEW_SECTION_START'
export const UPDATE_SECTION_ERROR = 'UPDATE_NEW_SECTION_ERROR'
export const UPDATE_SECTION_SUCCESS = 'UPDATE_NEW_SECTION_SUCCESS'

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

export function selectSectionToEdit(sectionID) {
    return function (dispatch) {
        dispatch(selectSectionToEditStart());

        api
            .getSection(sectionID)
            .then(data => {
                data
                    .json()
                    .then(data => {
                        dispatch(selectSectionToEditSuccess(data))
                    })
            })
            .catch(error => {
                dispatch(selectSectionToEditError(error))
            })
    }
}
function selectSectionToEditStart() {
    return {type: SELECT_SECTION_TO_EDIT_START}
}
function selectSectionToEditSuccess(data) {
    return {type: SELECT_SECTION_TO_EDIT_SUCCESS, data}
}
function selectSectionToEditError() {
    return {type: SELECT_SECTION_TO_EDIT_ERROR}
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
                    })
            })
            .catch(error => {
                dispatch(createNewSectionError(error))
            })
    }
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
function deleteSectionError(error) {
    return {type: DELETE_SECTION_ERROR, error}
}
function deleteSectionSuccess() {
    return {type: DELETE_SECTION_SUCCESS}
}

export function updateSection(sectionData) {
    return function (dispatch) {
        dispatch(updateSectionStart())
        api
            .updateSection(sectionData)
            .then(data => {
                data
                    .json()
                    .then(data => {
                        updateSectionSuccess(data)
                        dispatch(getExistingSectios())
                    })
            })
            .catch(error => dispatch(updateSectionError(error)))
    }
}
function updateSectionStart() {
    return {type: UPDATE_SECTION_START}
}
function updateSectionError(error) {
    return {type: UPDATE_SECTION_ERROR, error}
}
function updateSectionSuccess(data) {
    return {type: UPDATE_SECTION_SUCCESS, data}
}