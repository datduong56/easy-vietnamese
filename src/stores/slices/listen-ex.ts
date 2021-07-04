import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

export interface ListenExItem {
  id: number;
  sentence: { label: string; id: number }[];
  path: string[];
  createdAt: string;
  updatedAt: string;
}

interface ListenExItemResponse {
  id: number;
  sentence: string;
  path: string[];
  createdAt: string;
  updatedAt: string;
}

interface ListenExState {
  data: ListenExItem[];
  fetching: boolean;
  currentTime?: Date;
}

const initialState: ListenExState = {
  data: [],
  fetching: false,
};

export const getListenExercise = createAsyncThunk('listenEx/getExercise', async () => {
  const result: ListenExItemResponse[] = await new Promise(resolve =>
    setTimeout(async () => {
      const response = await instance.get('listen');
      resolve(response.data);
    }, 1000),
  );
  return result;
});

const listenExSlice = createSlice({
  name: 'listenEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListenExercise.pending, state => {
      state.fetching = true;
    });
    builder.addCase(getListenExercise.fulfilled, (state, { payload }) => {
      const newData = payload.map(d => ({ ...d, sentence: d.sentence.split(' ').map((ans: string, i: number) => ({ label: ans, id: i })) }));
      state.data = newData;
      state.fetching = false;
      state.currentTime = new Date();
    });
  },
});

export const listenExReducer = listenExSlice.reducer;

export const listenExAction = listenExSlice.actions;
