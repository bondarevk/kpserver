import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import infoReducer from './info_reducer';

export default {
  form,
  auth: authReducer,
  info: infoReducer
};