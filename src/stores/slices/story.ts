import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '@services/connection-instance';
import { AxiosResponse } from 'axios';

interface ApiResponse<T = Record<string, any>> {
  data: T[];
  meta: {
    take: number;
    page: number;
    pageCount: number;
    itemCount: number;
  };
}

interface IStory {
  id: number;
  name: string;
  covers?: string[];
}

interface IStoryCategory {
  id: number;
  name: string;
  stories: IStory[];
}

interface IChapter {
  id: number;
  name: string;
  content: string;
}

interface StoryState {
  categories: IStoryCategory[];
  stories: ApiResponse<IStory>;
  chapters: ApiResponse<IChapter>;
  storyDetail?: IStory;
  categoryDetails?: IStoryCategory;
}

const initialState: StoryState = {
  categories: [],
  stories: {
    data: [],
    meta: {
      page: 1,
      pageCount: 1,
      take: 10,
      itemCount: 0,
    },
  },
  chapters: {
    data: [],
    meta: {
      page: 1,
      pageCount: 1,
      take: 10,
      itemCount: 0,
    },
  },
};

export const fetchListStoryCategory = createAsyncThunk('story/fetchListStoryCategory', async () => {
  const { data }: { data: ApiResponse } = await instance.get('/story-categories');
  await Promise.all(
    data.data.map(async category => {
      const storyResponse: AxiosResponse<ApiResponse> = await instance.get('/stories', {
        params: {
          categoryId: category.id,
        },
      });
      category.stories = storyResponse.data.data;
    }),
  );
  return data;
});

export const fetchListStory = createAsyncThunk('story/fetchListStory', async (categoryId: number) => {
  const { data }: { data: ApiResponse<IStory> } = await instance.get('/stories', {
    params: { categoryId },
  });
  return data;
});

export const fetchMoreListStory = createAsyncThunk(
  'story/fetchMoreListStory',
  async ({ categoryId, take, page }: { categoryId: number; take: number; page: number }) => {
    const { data }: { data: ApiResponse<IStory> } = await instance.get('/stories', {
      params: { categoryId, take, page },
    });
    return data;
  },
);

export const fetchListStoryChapters = createAsyncThunk('story/fetchListStoryChapters', async (storyId: number) => {
  const { data }: { data: ApiResponse<IChapter> } = await instance.get('/chapters', {
    params: { storyId },
  });
  return data;
});

export const fetchMoreListStoryChapters = createAsyncThunk(
  'story/fetchMoreListStoryChapters',
  async ({ storyId, take, page }: { storyId: number; take: number; page: number }) => {
    const { data }: { data: ApiResponse<IChapter> } = await instance.get('/chapters', {
      params: { storyId, take, page },
    });
    return data;
  },
);

export const fetchStoryCategoryDetail = createAsyncThunk('story/fetchStoryCategoryDetail', async (id: number) => {
  const { data }: { data: IStoryCategory } = await instance.get(`/story-categories/${id}`);
  return data;
});

export const fetchStoryDetail = createAsyncThunk('story/fetchStoryDetail', async (id: number) => {
  const { data }: { data: IStory } = await instance.get(`/stories/${id}`);
  return data;
});

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchListStoryCategory.fulfilled, (state: StoryState, { payload }: PayloadAction<ApiResponse>) => {
      const { data } = payload;
      state.categories = data as any;
    });

    builder.addCase(fetchStoryCategoryDetail.fulfilled, (state: StoryState, { payload }: PayloadAction<IStoryCategory>) => {
      state.categoryDetails = payload;
    });

    builder.addCase(fetchListStory.fulfilled, (state: StoryState, { payload }: PayloadAction<ApiResponse<IStory>>) => {
      state.stories = payload;
    });

    builder.addCase(fetchStoryDetail.fulfilled, (state: StoryState, { payload }: PayloadAction<IStory>) => {
      state.storyDetail = payload;
    });

    builder.addCase(fetchMoreListStory.fulfilled, (state: StoryState, { payload }: PayloadAction<ApiResponse<IStory>>) => {
      state.stories = {
        ...payload,
        data: [...state.stories.data, ...payload.data],
      };
    });

    builder.addCase(fetchListStoryChapters.fulfilled, (state: StoryState, { payload }: PayloadAction<ApiResponse<IChapter>>) => {
      state.chapters = payload;
    });

    builder.addCase(fetchMoreListStoryChapters.fulfilled, (state: StoryState, { payload }: PayloadAction<ApiResponse<IChapter>>) => {
      state.chapters = { ...payload, data: [...state.chapters.data, ...payload.data] };
    });
  },
});

export const storyActions = storySlice.actions;

export const storyReducers = storySlice.reducer;
