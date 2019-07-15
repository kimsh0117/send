import { POST_SENDEMAIL, REQUEST, SUCCESS, FAILURE } from "store/constants";

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

export default {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure
};
