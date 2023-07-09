// third-party
import { combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
// import { store1 } from 'redux-store/store';
import authReducer from '../redux-store/reducers/authReducer';
import LanguageReducer from '../redux-store/reducers/LanguageReducer';
import ListedItemsReducer from '../redux-store/reducers/ListedItemsReducer';
import buyerSellerReducer from '../redux-store/reducers/buyerSellerReducer';
import registerReducer from '../redux-store/reducers/registerReducer';
import soldProductsReducer from '../redux-store/reducers/soldProductsReducer';
import SearchedListedProductsReducer from '../redux-store/reducers/SearchedListedProductsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    authReducer,
    LanguageReducer,
    ListedItemsReducer,
    buyerSellerReducer,
    registerReducer,
    soldProductsReducer,
    SearchedListedProductsReducer
});

export default reducer;
