import { all, fork } from 'redux-saga/effects';
import { authSaga, registerSaga, listeItemsSaga, SoldProductsSaga } from './saga';

export default function* rootSaga() {
    yield all([fork(authSaga), fork(registerSaga), fork(listeItemsSaga), fork(SoldProductsSaga)]);
}
