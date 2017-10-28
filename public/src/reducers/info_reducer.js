import {
  GET_EMAIL
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_EMAIL:
      return { ...state, status: action.status, error: action.error, email: action.email };
    default:
      break;
  }
  return state;
}