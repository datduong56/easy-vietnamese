import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sagaMiddleware).concat(logger),
});

sagaMiddleware.run(function* () {});

export default store;
