import { authReducer } from '@stores/slices/auth';
import { videoReducers } from '@stores/slices/video';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducers,
});

export default rootReducer;
