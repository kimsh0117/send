import { call, put, takeLatest, takeEvery, all, fork } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import { sendEmail, checkStatus } from "lib/api";
import { sendEmailAction } from "store/actions";
import * as types from "store/constants";

function countdown(secs) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END);
      }
    }, 1000);
    return () => {
      clearInterval(iv);
    };
  });
}

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
    const channel = yield call(countdown, 17);
    yield takeEvery(channel, function*(secs) {
      const result = yield call(checkStatus, id);
      yield put(
        sendEmailAction.checkStatusSuccess({
          status: result.obj.status,
          id
        })
      );
    });
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
