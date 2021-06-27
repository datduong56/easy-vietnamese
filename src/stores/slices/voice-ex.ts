import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface VoiceExState {
  data: any[];
  meta: any;
}

const initialState: VoiceExState = {
  data: [],
  meta: null,
};

export const getVoiceExercise = createAsyncThunk('voiceEx/getExercise', async () => {
  const result = await instance.get('voice');
  return result.data;
});

const voiceExSlice = createSlice({
  name: 'voiceEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVoiceExercise.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.meta = payload.meta;
    });
  },
});

export const voiceExReducer = voiceExSlice.reducer;

export const voiceExAction = voiceExSlice.actions;
