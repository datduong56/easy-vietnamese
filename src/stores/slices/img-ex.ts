import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

export interface Answers {
  createdAt: string;
  id: number;
  image: string;
  label: string;
  updatedAt: string;
}

export interface ImageEx {
  id: number;
  question: string;
  createdAt: string;
  updatedAt: string;
  correctAnswer: string;
  answers: Answers[];
}
interface ImgExState {
  data: ImageEx[];
  fetching: boolean;
}

const initialState: ImgExState = {
  data: [],
  fetching: false,
};

export const getImgExercise = createAsyncThunk('imgEx/getExercise', async () => {
  const result: ImageEx[] = await new Promise(resolve =>
    setTimeout(async () => {
      const response = await instance.get('images-exercise');
      resolve(response.data);
    }, 1000),
  );
  return result;
});

const imgExSlice = createSlice({
  name: 'imgEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getImgExercise.pending, state => {
      state.fetching = true;
    });
    builder.addCase(getImgExercise.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.fetching = false;
    });
  },
});

export const imgExReducer = imgExSlice.reducer;

export const imgExAction = imgExSlice.actions;
