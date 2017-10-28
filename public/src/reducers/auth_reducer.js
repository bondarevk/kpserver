import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      console.log(action);
      return { ...state, error: '', authenticated: true, username: action.payload.username };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false, username: '' };
    case AUTH_ERROR:
      return { ...state, error: action.payload, authenticated: false, username: '' };
    default:
      break;
  }
  return state;
}