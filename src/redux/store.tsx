import { combineReducers, configureStore } from '@reduxjs/toolkit';
import messageReducer from './feature/messageSlice';
import userReducer from './feature/userSlice';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const reducer = combineReducers({
	message: messageReducer,
	user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
