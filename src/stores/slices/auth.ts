import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export enum LoginMethod {
  PHONE = 0,
  GOOGLE = 1,
  FACEBOOK = 2,
}

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const logout: any = createAsyncThunk('auth/logout', async () => {
  // await instance.get('/user/logout');
});

const loginByGoogle = async (loginMethod: LoginMethod) => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const token = await auth().signInWithCredential(googleCredential);
  return await instance.post('/auth/login', { token: token, loginMethod });
};

export const login: any = createAsyncThunk('auth/login', async ({ loginMethod }) => {
  GoogleSignin.configure({
    webClientId: '',
  });
  try {
    if (loginMethod === LoginMethod.GOOGLE) {
      const result = loginByGoogle(loginMethod);
      return result;
    }
    if (loginMethod === LoginMethod.PHONE) {
      // Code
    }
    if (loginMethod === LoginMethod.FACEBOOK) {
      // Code
    }
  } catch (e) {
    console.log(e);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [logout.fulfilled]: state => {
      state.token = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.token = payload.accessToken;
    },
  },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
