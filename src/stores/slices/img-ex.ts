import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface ImgExState {
  data: any[];
  meta: any;
}

const initialState: ImgExState = {
  data: [],
  meta: null,
};

export const getImgExercise = createAsyncThunk('imgEx/getExercise', async () => {
  const result = await instance.get('images-exercise');
  return result.data;
});

const imgExSlice = createSlice({
  name: 'imgEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getImgExercise.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.meta = payload.meta;
    });
  },
});

export const imgExReducer = imgExSlice.reducer;

export const imgExAction = imgExSlice.actions;
