import { combineReducers } from "redux";
import notification from "./notificationReducer";
import notificationUpdate from "./notificationUpdateReducer";

export default combineReducers({
  notification,
  notificationUpdate
});
