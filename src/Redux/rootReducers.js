import { combineReducers } from 'redux';
import {authReducer} from "./Auth/AuthReducer";
import { reducer as formReducer } from 'redux-form'
import {currentUserReducer} from "./CurrentUser/currentUserReducer";
import {allUsersReducer} from "./AllUsers/allUsersReducer";
import {messagesReducer} from "./Messages/messagesReducer";


export default combineReducers({
  isAuth:authReducer,
  form: formReducer,
  user:currentUserReducer,
  users:allUsersReducer,
  messages:messagesReducer,
  },
);
