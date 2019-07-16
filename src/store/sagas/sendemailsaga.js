import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { sendEmail, checkStatus } from "lib/api";
import { sendEmailAction } from "store/actions";
import * as types from "store/constants";

export function* fetchSendEmail(action) {
  try {
    const result = yield call(sendEmail, action.letter, action.mca);
    yield put(
      sendEmailAction.sendEmailSuccess({
        "track.id": result["track.id"],
        "request.id": result["request.id"],
        emailfor: action.mca[0],
        theme: action.letter.subject
      })
    );
    yield call(fetchCheckStatus, result["track.id"]);
  } catch (error) {
    yield put(sendEmailAction.sendEmailFailure("Ошибка отправки сообщения"));
  }
}

export function* fetchCheckStatus(id) {
  try {
    let count = 0;
    while(count > -1) {
      const result = yield call(checkStatus, id);
      yield put(
        sendEmailAction.checkStatusSuccess({
          status: result.obj.status,
          id
        })
      );
      count = parseInt(result.obj.status);
    }
  } catch (error) {
    yield put(sendEmailAction.sendEmailFailure("Ошибка отправки сообщения"));
  }
}

export function* watchSendEmail() {
  yield takeLatest([types.POST_SENDEMAIL[types.REQUEST]], fetchSendEmail);
}

export default function*() {
  yield all([fork(watchSendEmail)]);
}