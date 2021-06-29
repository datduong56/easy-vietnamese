import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance, { setToken } from '@services/connection-instance';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LoginMethod {
  PHONE = 0,
  GOOGLE = 1,
  FACEBOOK = 2,
}

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
};

export const logout: any = createAsyncThunk('auth/logout', async () => {
  await instance.post('auth/logout');
  AsyncStorage.removeItem('token');
});

export const login: any = createAsyncThunk('auth/login', async ({ loginMethod }: { loginMethod: LoginMethod }) => {
  try {
    if (loginMethod !== LoginMethod.GOOGLE) {
      return;
    }
    GoogleSignin.configure({
      webClientId: '268066571744-qqarnouc9bpmoubbrhkh8pqe6fj8des4.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    if (!idToken) {
      return;
    }
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const { user } = await auth().signInWithCredential(googleCredential);
    const token = await user.getIdTokenResult();
    const result: any = await instance.post('/auth/login', { token: token.token, loginMethod: 'Google' });
    if (!result.data) {
      return;
    }
    setToken(result.data.accessToken);
    AsyncStorage.setItem('token', result.data.accessToken);
    return result.data;
  } catch (e) {
    throw e.message;
  }
});

const setTokenState = (state, { payload }) => {
  state.token = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenState,
  },
  extraReducers: {
    [logout.fulfilled]: state => {
      state.token = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.token = payload.accessToken;
    },
    [login.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
