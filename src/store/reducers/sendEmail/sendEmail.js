import { POST_SENDEMAIL, REQUEST, SUCCESS, FAILURE } from "store/constants";

const initialState = {
  messages: [],
  sending: false,
  emailfor: "send@send.com",
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
      let date = action.payload['request.id'].match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
      const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            date: `${date[3]} ${months[parseInt(date[2])-1]}`,
            theme: action.payload.theme,
            status: 0,
            'track.id': action.payload['track.id']
          }
        ],
        emailfor: action.payload.emailfor
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
