import { combineReducers } from "redux";

import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
