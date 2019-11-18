import { all, takeEvery, put } from "redux-saga/effects";
import { APP_LOADING, SET_STATE } from "./constants";

export function* appLoading({ payload }) {
  const { loading } = payload;
  yield put({
    type: SET_STATE,
    payload: {
      loading
    }
  });
}

export default function* rootSaga() {
  yield all([takeEvery(APP_LOADING, appLoading)]);
}
