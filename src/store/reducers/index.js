import { combineReducers } from 'redux';
import sendEmailReducer from "store/reducers/sendEmail";

export const rootReducer = combineReducers({
  send: sendEmailReducer
})