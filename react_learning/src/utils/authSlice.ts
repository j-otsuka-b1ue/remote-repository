import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterInitialState {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  representative_image: string | null;
}

interface RegistrationData {
  user_id: string;
  name: string;
  email: string;
  password: string;
  representative_image: string;
  token: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: null;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  registrationInfo: RegisterInitialState;
  registrationData: RegistrationData;
}

const registerInitialState: RegisterInitialState = {
  name: "",
  email: "",
  password: "",
  password_confirm: "",
  representative_image: null,
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  registrationInfo: registerInitialState,
  registrationData: {
    user_id: "",
    name: "",
    email: "",
    password: "",
    representative_image: "",
    token: "",
    created_at: null,
    updated_at: null,
    deleted_at: null,
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<{ isLoggedIn: boolean; token: string | null }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      state.token = null;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    setRegisterInfo: (state, action: PayloadAction<RegisterInitialState>) => {
      state.registrationInfo = action.payload;
    }
  },
});

export const { login, logout, setLoggedIn, setRegisterInfo } = authSlice.actions;
export default authSlice.reducer;
