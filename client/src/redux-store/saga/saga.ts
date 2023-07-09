import { put, takeLatest, select, call } from 'redux-saga/effects';
import { loginApi, registerApi, ListedItemsApi, SoldProductsApi } from '../../api/authApi';

export interface ResponseGenerator {
    json(): unknown;
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}
//unify technologies
function* fetchAuthDetails(action: any) {
    // alert('Auth Details');
    try {
        console.log(action.payload);

        const loginRes: ResponseGenerator = yield loginApi(action.payload);
        console.log(loginRes, 'jjjjj');
        yield put({
            type: 'LOGIN_USER',
            payload: loginRes.data
        });
        yield put({
            type: 'BUYER_SELLER',
            payload: loginRes.data
        });
    } catch (e) {
        console.log('errors', e);
    }
}

function* registerDetails(action: any) {
    try {
        console.log('register user in saga', action.payload);
        const registerRes: ResponseGenerator = yield registerApi(action.payload);
        yield put({
            type: 'REGISTER_USER_RES',
            payload: registerRes.data
        });
    } catch (e) {
        console.log('errors', e);
    }
}

function* listedItems() {
    try {
        // console.log("listedItems", action.payload);
        const listedItemsRes: ResponseGenerator = yield ListedItemsApi();
        // console.log('listedItems in saga>>>',listedItemsRes)
        yield put({
            type: 'ALL_LISTED_ITEMS',
            payload: listedItemsRes
        });
        // console.log("listedItemsQQQQ",listedItems)
    } catch (e) {
        console.log('errors', e);
    }
}

function* soldProducts(action: any) {
    try {
        console.log('listedItems', action.payload);
        const soldItemsRes: ResponseGenerator = yield SoldProductsApi(action.payload);
        console.log('soldItemsRes in saga>>>', soldItemsRes);
        yield put({
            type: 'ALL_SOLD_PRODUCTS',
            payload: soldItemsRes
        });
        // console.log("listedItemsQQQQ",listedItems)
    } catch (e) {
        console.log('errors', e);
    }
}

export function* authSaga() {
    yield takeLatest('SIGN_IN_USER', fetchAuthDetails);
}
export function* registerSaga() {
    yield takeLatest('REGISTER_USER', registerDetails);
}
export function* listeItemsSaga() {
    yield takeLatest('LISTED_ITEMS', listedItems);
}

export function* SoldProductsSaga() {
    yield takeLatest('SOLD_PRODUCTS', soldProducts);
}
