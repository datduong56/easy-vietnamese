import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

const initialState = {
  fetching: false,
  data: [],
  meta: null,
  error: null,
  refreshing: false,
};

export const fetchListVideo: any = createAsyncThunk('video/fetchListVideo', async () => {
  const { data } = await instance.get('video');
  return data;
});

const refresh = state => {
  state.refreshing = false;
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    refresh,
  },
  extraReducers: {
    [fetchListVideo.pending]: state => {
      state.fetching = true;
    },
    [fetchListVideo.fulfilled]: (state, { payload }) => {
      state.fetching = false;
      state.data = payload.data;
      state.meta = payload.meta;
    },
    [fetchListVideo.rejected]: state => {
      state.fetching = false;
    },
  },
});

export const videoActions = videoSlice.actions;

export const videoReducers = videoSlice.reducer;
