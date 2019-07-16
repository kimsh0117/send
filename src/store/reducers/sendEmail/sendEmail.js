import {
  POST_SENDEMAIL,
  POST_CHECKSTATUS,
  REQUEST,
  SUCCESS,
  FAILURE
} from "store/constants";

const initialState = {
  messages: [],
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
      let date = action.payload["request.id"].match(
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
      );
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            date: `${date[3]} ${months[parseInt(date[2]) - 1]}`,
            theme: action.payload.theme,
            status: "",
            "track.id": action.payload["track.id"]
          }
        ],
        emailfor: action.payload.emailfor
      };
    case POST_SENDEMAIL[FAILURE]:
      return {
        ...state,
        errMsg: action.err
      };
    case POST_CHECKSTATUS[SUCCESS]:
      let objIndex = state.messages.findIndex(obj => obj["track.id"] === action.payload.id);
      if (action.payload.status === -1 ) {
        state.messages[objIndex].status = 1;
        return {
          ...state,
          sending: false,
          messages: [...state.messages]
        };
      }
      if(action.payload.status < -1) {
        state.messages[objIndex].status = 2;
        return {
          ...state,
          sending: false,
          messages: [...state.messages]
        };
      }
      if (action.payload.status > -1) {
        state.messages[objIndex].status = 0;
        return {
          ...state,
          messages: [...state.messages]
        };
      }
      break;
    default:
      return state;
  }
}
