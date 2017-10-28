import axios from 'axios';
import history from '../history';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GET_EMAIL
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { username, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: {
            username: response.data.username
          }
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        history.push('/feature');
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.error
          });
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: "Сервер недоступен"
          });
        }
      });
  }
}

export function signUpUser({ username, email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { username, email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: {
            username: response.data.username
          }
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        history.push('/feature');
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.error
          });
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: "Сервер недоступен"
          });
        }
      });
  }
}

export function getEmail() {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/getemail`, {}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: GET_EMAIL,
          status: 'success',
          email: response.data.email
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: GET_EMAIL,
            status: 'error',
            error: error.response.data.error
          });
        } else {
          dispatch({
            type: GET_EMAIL,
            status: 'error',
            error: 'Сервер недоступен'
          });
        }
      });
  }
}

export function signOutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return {
    type: UNAUTH_USER
  }
}