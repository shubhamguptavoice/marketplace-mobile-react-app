import authReducer from './reducers/authReducer';
import registerReducer from './reducers/registerReducer';
import ListingReducer from './reducers/ListingItemsReducer';
import AllListedItemsReducer from './reducers/ListedItemsReducer';
import buyerSellerReducer from './reducers/buyerSellerReducer';
import soldProductsReducer from './reducers/soldProductsReducer';
import languageTranslationReducer from './reducers/LanguageReducer';
import SearchedListedProductsReducer from './reducers/SearchedListedProductsReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    ListingReducer,
    AllListedItemsReducer,
    buyerSellerReducer,
    soldProductsReducer,
    languageTranslationReducer,
    SearchedListedProductsReducer
});

export const sagaMiddleware = createSagaMiddleware();

export const store1 = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
