import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice ({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    // 現在の `setLoggedIn` アクションを使用して、ログイン状態のみを設定
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      // トークンはクリアするか、またはそのままにするかを選択
      state.token = null;
    },
    // ログインアクション（トークンはここでは設定しない）
    login: state => {
      state.isLoggedIn = true;
    },
    // ログアウトアクション（トークンもクリアする）
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;