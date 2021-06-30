import { voiceExReducer } from './../slices/voice-ex';
import { authReducer } from '@stores/slices/auth';
import { imgExReducer } from '@stores/slices/img-ex';
import { userReducer } from '@stores/slices/user';
import { videoReducers } from '@stores/slices/video';
import { wordExReducer } from '@stores/slices/word-ex';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducers,
  user: userReducer,
  wordEx: wordExReducer,
  imgEx: imgExReducer,
  voiceEx: voiceExReducer,
});

export default rootReducer;
