import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import contactsReducer from './contacts/contactsSlice';
import filtersReducer from './filters/filtersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token',],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  contacts: contactsReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault => getDefault({ serializableCheck: false }),
});

export const persistor = persistStore(store);
