import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const logout: any = createAsyncThunk('auth/logout', async () => {
  // await instance.get('/user/logout');
});

export const login: any = createAsyncThunk('auth/login', async () => {
  // await instance.post('/auth/login');
  return 'token';
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
      state.token = payload;
    },
  },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
