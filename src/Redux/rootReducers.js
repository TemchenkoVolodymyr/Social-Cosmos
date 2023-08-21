import { combineReducers } from 'redux';
import {authReducer} from "./Auth/AuthReducer";
import { reducer as formReducer } from 'redux-form'
import {currentUserReducer} from "./CurrentUser/currentUserReducer";


export default combineReducers({
  isAuth:authReducer,
  form: formReducer,
  user:currentUserReducer,
  },
);
