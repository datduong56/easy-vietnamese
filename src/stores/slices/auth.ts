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

const loginByGoogle = async () => {
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
  return await instance.post('/auth/login', { token: token.token, loginMethod: 'Google' });
};

export const login: any = createAsyncThunk('auth/login', async ({ loginMethod }: { loginMethod: LoginMethod }) => {
  try {
    if (loginMethod === LoginMethod.GOOGLE) {
      return await loginByGoogle();
    }
    if (loginMethod === LoginMethod.PHONE) {
      // code
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
      console.log('===========', payload);
      state.token = payload.data.accessToken;
    },
  },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
