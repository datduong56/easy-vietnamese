import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface UserState {
  id: number;
  email: undefined | string | null;
  nation: null;
  avatar: null;
  displayName: null;
  joined?: string | unknown;
  error?: string | null | unknown;
}

const initialState = {
  id: 0,
  email: null,
  nation: null,
  avatar: null,
  displayName: null,
  joined: null,
  error: undefined,
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  try {
    const result: any = await instance.get('user/me');
    return result.data;
  } catch (e) {
    throw e.message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserInfo.fulfilled, (state: UserState, { payload }: PayloadAction<any>) => {
      state.id = payload.id;
      state.email = payload.email;
      state.nation = payload.nation;
      state.displayName = payload.displayName;
      state.joined = payload.createdAt;
    });
    builder.addCase(getUserInfo.rejected, (state: UserState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    });
  },
});

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
