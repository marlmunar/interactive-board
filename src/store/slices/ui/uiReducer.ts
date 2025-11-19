import { combineReducers } from "@reduxjs/toolkit";
import habitBoardSliceReducer from "./habitBoardSlice";

const uiReducer = combineReducers({
  habitBoard: habitBoardSliceReducer,
});

export default uiReducer;
