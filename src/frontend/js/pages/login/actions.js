import api from '../../api';

export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const AUTHENTICATION = 'AUTHENTICATION';

// Async get Section Page Structure

function authentication(data) { return { type: AUTHENTICATION, data }}
function authenticationFailure(data) { return { type: AUTHENTICATION_FAILURE, data }}

export function getAuthenticate(type, data) {
  return function (dispatch) {
    api.authenticate(type, data)
      .then(data => {
        if(data.message)
          dispatch(authenticationFailure(data))
        else
          dispatch(authentication(data))
      })
      .catch(reason => dispatch(authenticationFailure(reason)));
  };
}