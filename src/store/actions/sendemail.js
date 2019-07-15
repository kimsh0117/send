import {
  POST_SENDEMAIL,
  POST_CHECKSTATUS,
  REQUEST,
  SUCCESS,
  FAILURE
} from "store/constants";

const sendEmailRequest = (letter, mca) => ({
  type: POST_SENDEMAIL[REQUEST],
  letter,
  mca
});

const sendEmailSuccess = payload => ({
  type: POST_SENDEMAIL[SUCCESS],
  payload
});

const sendEmailFailure = err => ({
  type: POST_SENDEMAIL[FAILURE],
  err
});

const checkStatusSuccess = payload => ({
  type: POST_CHECKSTATUS[SUCCESS],
  payload
});

const checkStatusFailure = err => ({
  type: POST_CHECKSTATUS[FAILURE],
  err
});

export default {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
  checkStatusSuccess,
  checkStatusFailure
};
