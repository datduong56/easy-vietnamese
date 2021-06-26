import { authReducer } from '@stores/slices/auth';
import { userReducer } from '@stores/slices/user';
import { videoReducers } from '@stores/slices/video';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducers,
  user: userReducer,
});

export default rootReducer;
