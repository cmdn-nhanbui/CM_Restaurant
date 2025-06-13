import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import type { ThunkDispatch } from 'redux-thunk';

import { loggerMiddleware } from './loggerMiddleware';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, undefined, any>;

export default store;
