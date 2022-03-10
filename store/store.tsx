import { configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { availableProductsReducer } from './Slices/availableProductsSlice';
import { authReducer } from './Slices/authSlice';
import { cartReducer } from './Slices/cartSlice';
import { favoriteReducer } from './Slices/favoriteSlice';
import { underlinedNavReducer } from './Slices/underlinedNavSlice';

const reducers = combineReducers({
	availableProducts: availableProductsReducer,
	authData: authReducer,
	cartData: cartReducer,
	favoriteData: favoriteReducer,
	underlinedNavData: underlinedNavReducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;

type RootState = ReturnType<typeof store.getState>;
export const availableProductsInfo = (state: RootState) =>
	state.availableProducts.data;
export const authInfo = (state: RootState) => state.authData.data;
export const cartInfo = (state: RootState) => state.cartData.data;
export const cartLoggedOutInfo = (state: RootState) =>
	state.cartData.cartLoggedOut;
export const favoritesInfo = (state: RootState) => state.favoriteData.data;
export const underlinedNavInfo = (state: RootState) =>
	state.underlinedNavData.data;
