import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

export default {
  form,
  auth: authReducer
};