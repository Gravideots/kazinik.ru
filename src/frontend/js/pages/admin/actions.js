import api from '../../api'

export const ASYNC_START = 'ASYNC_ERROR'
export const ASYNC_ERROR = 'ASYNC_ERROR'
export const ASYNC_SUCCESS = 'ASYNC_SUCCESS'

export const GET_ADMIN_PAGE_START = 'GET_ADMIN_PAGE_START'
export const GET_ADMIN_PAGE_ERROR = 'GET_ADMIN_PAGE_ERROR'
export const GET_ADMIN_PAGE_SUCCESS = 'GET_ADMIN_PAGE_SUCCESS'
export const ADMIN_PAGE_UNLOAD = 'ADMIN_PAGE_UNLOAD'

export const GET_POSSIBLE_SECTIONS_LIST_START = 'GET_POSSIBLE_SECTIONS_LIST_START'
export const GET_POSSIBLE_SECTIONS_LIST_SUCCESS = 'GET_POSSIBLE_SECTIONS_LIST_SUCCESS'
export const GET_POSSIBLE_SECTIONS_LIST_ERROR = 'GET_POSSIBLE_SECTIONS_LIST_ERROR'

export const GET_USERS_LIST_START = 'GET_USERS_START'
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS'
export const GET_USERS_LIST_ERROR = 'GET_USERS_LIST_ERROR'

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

export const SELECT_ADD_CONTENT_TO_SECTION_START = 'SELECT_ADD_CONTENT_TO_SECTION_START'
export const SELECT_ADD_CONTENT_TO_SECTION_ERROR = 'SELECT_ADD_CONTENT_TO_SECTION_ERROR'
export const SELECT_ADD_CONTENT_TO_SECTION_SUCCESS = 'SELECT_ADD_CONTENT_TO_SECTION_SUCCESS'

export const OPEN_CONTENT_CREATION = 'OPEN_CONTENT_CREATION'

export const ADD_MEDIA_CONTENT_START = 'ADD_MEDIA_CONTENT_START'
export const ADD_MEDIA_CONTENT_ERROR = 'ADD_MEDIA_CONTENT_ERROR'
export const ADD_MEDIA_CONTENT_SUCCESS = 'ADD_MEDIA_CONTENT_SUCCESS'

export const DELETE_MEDIA_CONTENT_START = 'DELETE_MEDIA_CONTENT_START'
export const DELETE_MEDIA_CONTENT_ERROR = 'DELETE_MEDIA_CONTENT_ERROR'
export const DELETE_MEDIA_CONTENT_SUCCESS = 'DELETE_MEDIA_CONTENT_SUCCESS'


function asyncStart() {
    return {type: ASYNC_START}
}
function asyncSuccess(data) {
    return {type: ASYNC_SUCCESS, data}
}
function asyncError(error) {
    return {type: ASYNC_ERROR, error}
}



function getAdminPageStart() {
    return {type: GET_ADMIN_PAGE_START}
}
function getAdminPageSuccess(data) {
    return {type: GET_ADMIN_PAGE_SUCCESS, data}
}
function getAdminPageError(error) {
    return {type: GET_ADMIN_PAGE_ERROR, error}
}
function closeAdminPage() {
    return {type: ADMIN_PAGE_UNLOAD}
}
export function getAdminPage() {
    return function (dispatch) {
        dispatch(getAdminPageSuccess());
    };
}
export function leaveAdminPage(){
    return function (dispatch) {
        dispatch(closeAdminPage());
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
            .then(data => dispatch(getPossibleSectionsListSuccess(data)))
            .catch(error => dispatch(getPossibleSectionsListError(error)));
    };
}

function getUsersListStart(data) {
    return {type: GET_USERS_LIST_START};
}
function getUsersListSuccess(data) {
    return {type: GET_USERS_LIST_SUCCESS, data};
}
function getUsersListError(data) {
    return {type: GET_USERS_LIST_ERROR};
}

export function getUsersList() {
    return function (dispatch) {
        dispatch(getUsersListStart())
        api
            .getUsersList()
            .then(data => dispatch(getUsersListSuccess(data)))
            .catch(error => dispatch(getUsersListError(error)));
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
                dispatch(selectSectionToEditSuccess(data))
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
                dispatch(createNewSectionSuccess(data.body))
                dispatch(getExistingSectios())
                dispatch(getPossibleSectiosList())
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

export function deleteSection(sectionID) {
    return function (dispatch) {
        dispatch(deleteSectionStart())
        api
            .deleteSection(sectionID)
            .then(data => {
                dispatch(deleteSectionSuccess(data))
                dispatch(getExistingSectios())
                dispatch(getPossibleSectiosList())
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
                updateSectionSuccess(data)
                dispatch(getExistingSectios())
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

export function selectSectionToAddContent(sectionID) {
    return function (dispatch) {
        dispatch(selectSectionToAddContentStart())
        api
            .getSection(sectionID)
            .then(data => {
                dispatch(selectSectionToAddContentSuccess({ContentManagement: data}))
            })
            .catch(error => dispatch(selectSectionToAddContentError(error)))
    }
}
function selectSectionToAddContentStart() {
    return {type: SELECT_ADD_CONTENT_TO_SECTION_START}
}
function selectSectionToAddContentError(error) {
    return {type: SELECT_ADD_CONTENT_TO_SECTION_ERROR, error}
}
function selectSectionToAddContentSuccess(data) {
    return {type: SELECT_ADD_CONTENT_TO_SECTION_SUCCESS, data}
}

export function openContentCreation(data) {
    return {type: OPEN_CONTENT_CREATION, data}
}

export function addMedia(media) {
    return function (dispatch) {
        dispatch(addMediaStart())
        api
            .addMedia(media)
            .then(data => {
                dispatch(addMediaSuccess({ContentManagement: data}))
                dispatch(selectSectionToAddContent(data.data))
            })
            .catch(error => dispatch(addMediaError(error)))
    }
}
function addMediaStart() {
    return {type: ADD_MEDIA_CONTENT_START}
}
function addMediaSuccess() {
    return {type: ADD_MEDIA_CONTENT_SUCCESS}
}
function addMediaError() {
    return {type: ADD_MEDIA_CONTENT_ERROR}
}

export function deleteMedia(sectionID, mediaID, tags) {
    return function (dispatch) {
        dispatch(deleteMediaStart())
        api
            .deleteMedia(sectionID, mediaID, tags)
            .then(data => {
                dispatch(deleteMediaSuccess({ContentManagement: data}))
                dispatch(selectSectionToAddContent(data.data))
            })
            .catch(error => dispatch(deleteMediaError(error)))
    }
}

function deleteMediaStart() {
    return {type: DELETE_MEDIA_CONTENT_START}
}
function deleteMediaSuccess() {
    return {type: DELETE_MEDIA_CONTENT_SUCCESS}
}
function deleteMediaError() {
    return {type: DELETE_MEDIA_CONTENT_ERROR}
}

export function createNote( note ){

    //console.log("NOTE", note)
    
    let formData = new FormData();
    
    if( note.TitleImage !== '' ){
      formData.append( 'TitleImage', note.TitleImage, note.TitleImage.name )
      note.TitleImage = '';
    }

    note.Note.length > 0 && note.Note.map( ( element, key ) => {
      if( element.Image ) {
        formData.append( key, element.Image, element.Image.name )
        note.Note[key] = '';
      }
    })

    formData.append( 'note', JSON.stringify( note ));

    return function (dispatch) {
        dispatch(asyncStart())
        api
            .createNote( formData )
            .then(data => {
                dispatch(asyncSuccess({ ContentManagement: data }))
                dispatch(selectSectionToAddContent(data.data))
            })
            .catch(error => dispatch(asyncError(error)))
    }
}