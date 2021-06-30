import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';

interface VoiceExState {
  data: any[];
  fetching: boolean;
}

const initialState: VoiceExState = {
  data: [],
  fetching: false,
};

export const getVoiceExercise = createAsyncThunk('voiceEx/getExercise', async () => {
  const result: any[] = await new Promise(resolve =>
    setTimeout(async () => {
      const response = await instance.get('voice');
      resolve(response.data);
    }, 1000),
  );
  return result;
});

const voiceExSlice = createSlice({
  name: 'voiceEx',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVoiceExercise.pending, state => {
      state.fetching = true;
    });
    builder.addCase(getVoiceExercise.fulfilled, (state, { payload }) => {
      const newData = payload.map(d => ({ ...d, sentence: d.sentence.split(' ').map((ans: string, i: number) => ({ label: ans, id: i })) }));
      state.data = newData;
      state.fetching = false;
    });
  },
});

export const voiceExReducer = voiceExSlice.reducer;

export const voiceExAction = voiceExSlice.actions;
