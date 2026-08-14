import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import authSlice from './authSlice'
import blogSlice from './blogSlice'
import commentSlice from './commentSlice'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: authSlice,
  blog: blogSlice,
  comment: commentSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


 