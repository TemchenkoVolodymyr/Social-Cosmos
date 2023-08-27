import { combineReducers } from 'redux';
import {authReducer} from "./Auth/AuthReducer";
import { reducer as formReducer } from 'redux-form'
import {currentUserReducer} from "./CurrentUser/currentUserReducer";
import {allUsersReducer} from "./AllUsers/allUsersReducer";
import {messagesReducer} from "./Messages/messagesReducer";
import {onlineUsersReducer} from "./OnlineUsers/onlineUserReducer";
import {recipientUserReducer} from "./recipientUser/recipientUserReducer";
import {currentChatReducer} from "./CurrentChat/currentChatReducer";
import {currentChatTextReducer} from "./CurrentChatTexts/currentChatTextReducer";
import {onlineMessagesReducer} from "./onlineMessages/onlineMessagesReducer";
import {allChatsCurrentLoginUserReducer} from "./AllChatsCurrentLoginUser/allChatsCurrentLoginUserReducer";
import {sidebarReducer} from "./Sidebar/sidebarReducer";


export default combineReducers({
  isAuth:authReducer,
  form: formReducer,
  user:currentUserReducer,
  users:allUsersReducer,
  messages:messagesReducer,
  onlineUsers:onlineUsersReducer,
  recipientUser:recipientUserReducer,
  currentChat:currentChatReducer,
  currentChatTexts:currentChatTextReducer,
  onlineMessages:onlineMessagesReducer,
  allChatsCurrentUser:allChatsCurrentLoginUserReducer,
  sidebar:sidebarReducer

  },
);
