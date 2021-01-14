import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
// rootReducer
export const rootReducer = combineReducers({
  userReducer,
});
