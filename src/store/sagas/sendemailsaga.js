import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { sendEmail } from "lib/api";
import { sendEmailAction } from "store/actions";
import * as types from "store/constants";

export function* fetchSendEmail(action) {
  const result = yield call(sendEmail, action.letter, action.mca);
  if (result) {
    yield put(
      sendEmailAction.sendEmailSuccess({
        'track.id': result['track.id'],
        'request.id': result['request.id'],
        'emailfor': action.mca[0],
        'theme': action.letter.subject
      })
    );
  } else {
    yield put(sendEmailAction.sendEmailFailure("Ошибка отправки сообщения"));
  }
}

export function* watchSendEmail() {
  yield takeLatest([types.POST_SENDEMAIL[types.REQUEST]], fetchSendEmail);
}

export default function* () {
  yield all([fork(watchSendEmail)]);
}
