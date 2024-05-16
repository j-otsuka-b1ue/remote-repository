import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './authSlice';
import { articleReducer } from './authSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  user: ReturnType<typeof userReducer>;
  article: ReturnType<typeof articleReducer>
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    article: articleReducer,
  },
});

export default store;