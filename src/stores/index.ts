import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // .prepend(sagaMiddleware)
      .concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
