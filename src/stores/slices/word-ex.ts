import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface WordExState {
  data: any[];
  fetching: boolean;
}

const initialState: WordExState = {
  data: [],
  fetching: false,
};

export const getWordExercise = createAsyncThunk('wordEx/getExercise', async () => {
  const result: any[] = await new Promise(resolve =>
    setTimeout(async () => {
      const response = await instance.get('words-exercise');
      resolve(response.data);
    }, 1000),
  );
  return result;
});

const wordExSlice = createSlice({
  name: 'wordEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWordExercise.pending, state => {
      state.fetching = true;
    });
    builder.addCase(getWordExercise.fulfilled, (state, { payload }) => {
      const newData = payload.map(d => ({ ...d, answer: d.answer.split(' ').map((ans: string, i: number) => ({ label: ans, id: i })) }));
      state.data = newData;
      state.fetching = false;
    });
  },
});

export const wordExReducer = wordExSlice.reducer;

export const wordExAction = wordExSlice.actions;
