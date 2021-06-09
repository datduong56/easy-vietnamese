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

// sagaMiddleware.run(function* () {});

export default store;
