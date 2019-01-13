// import ajaxHelper from '../helpers/ajax_helper';
import {Cookies} from 'react-cookie';
import "isomorphic-fetch"

// import * as actionTypes from './actions_types';

export function loginSuccess(user) {
  let actionType;
  switch (user.role) {
    case 'patient':
      // actionType = actionTypes.LOGIN_SUCCESS_PATIENT;
      break;
    case 'supervisor':
    case 'therapist':
      // actionType = actionTypes.LOGIN_SUCCESS_THERAPIST;
      break;
    case 'siteadmin':
      // actionType = actionTypes.LOGIN_SUCCESS_SITEADMIN;
      break;
    case 'admin':
      // actionType = actionTypes.LOGIN_SUCCESS_ADMIN;
      break;
    case 'superadmin':
      // actionType = actionTypes.LOGIN_SUCCESS_SUPERADMIN;
      break;
  }
  return {
    type: actionType,
    user,
  };
}

export function loginFail(error) {
  return {
    // type: actionTypes.LOGIN_ERROR,
    error,
  };
}

export function onSubmit(params) {
  return function (dispatch) {
    return fetch('/login/authenticate', {
      method: 'post',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          switch (data.error.message) {
            case 'IncorrectUsernameOrPassword':
              dispatch(loginFail('Incorrect username or password.'));
              break;
            case 'UserIsDisabled':
              dispatch(loginFail('User is disabled.'));
              break;
            case 'TooManyLoggedInCliniciansInSite':
              dispatch(loginFail('Too many clinicians logged in on your site, please contact your site admin'));
              break;
            case 'PatientNotAllowedRemoteLogin':
              dispatch(loginFail('You are not allowed to login from home, please contact your supplier'));
              break;
            default:
              dispatch(loginFail("Server Error"));
          }
        } else {
            Cookies.save('jwt_token', data.token, { path: '/' });
          dispatch(loginSuccess(data.user));
          // browserHistory.push(data.url);
        }
      })
      .catch((error) => {
        dispatch(loginFail("Server Error"));
      });
  };
}

export function rememberMe(done) {
  const succ = (dispatch, res) => {
    dispatch(loginSuccess(res.data.user));
    // browserHistory.push(res.data.url);
  };
  const err = (dispatch, error) => {
    dispatch(loginFail("Server Error"));
    done();
    // Failed to login via remember me cookie, nothing to do.
  };
  return (dispatch) => {
  //   return ajaxHelper({
  //     request: {
  //       method: 'post',
  //       url: 'login/remembered_user',
  //     },
  //   })
  //     .then(
  //       (res => succ(dispatch, res)),
  //       err
  //     )
  //     .catch(e => err(dispatch, e));
  };
}

export function logout(userId) {
  // ajaxHelper({
  //   request: {
  //     method: 'post',
  //     url: '/login/logout',
  //     data: { userId },
  //   },
  // });
    Cookies.remove('jwt_token');
  window.location.href = '/';
  return {}
  // return { type: actionTypes.LOGOUT };
}