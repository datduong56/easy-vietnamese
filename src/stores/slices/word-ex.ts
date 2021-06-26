import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface WordExState {
  data: any[];
  meta: any;
}

const initialState: WordExState = {
  data: [],
  meta: null,
};

export const getWordExercise = createAsyncThunk('wordEx/getExercise', async () => {
  const result = await instance.get('words-exercise');
  return result.data;
});

const wordExSlice = createSlice({
  name: 'wordEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWordExercise.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.meta = payload.meta;
    });
  },
});

export const wordExReducer = wordExSlice.reducer;

export const wordExAction = wordExSlice.actions;
