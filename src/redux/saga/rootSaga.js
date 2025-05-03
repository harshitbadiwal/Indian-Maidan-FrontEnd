import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './login/loginSaga';

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
  ]);
}