import { authReducer } from '@stores/slices/auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
