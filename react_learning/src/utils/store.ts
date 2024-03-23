import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './authSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  user: ReturnType<typeof userReducer>;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;