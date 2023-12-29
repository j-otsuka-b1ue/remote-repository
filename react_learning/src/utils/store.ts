import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;