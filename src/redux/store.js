import { configureStore } from '@reduxjs/toolkit';
import { plateReducer } from '../redux/plates/reducer';
import {
  persistStore,
//   persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const store = configureStore({
    reducer: {
        // auth: authPersistReducer,
        plates: plateReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }  
    })
});

export const persistor = persistStore(store);