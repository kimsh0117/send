import { POST_SENDEMAIL, REQUEST, SUCCESS, FAILURE } from "store/constants";

const initialState = {
  messages: ['b'],
  sending: false,
  emailfor: "",
  errMsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_SENDEMAIL[REQUEST]:
      return {
        ...state,
        sending: true
      };
    case POST_SENDEMAIL[SUCCESS]:
      return {
        ...state,
        messages: ['a',...state.messages],
        emailfor: 'send@send.com'
      };
    case POST_SENDEMAIL[FAILURE]:
      return {
        ...state,
        errMsg: action.err
      };
    default:
      return state;
  }
}
