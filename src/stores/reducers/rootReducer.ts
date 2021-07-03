import { voiceExReducer } from './../slices/voice-ex';
import { authReducer } from '@stores/slices/auth';
import { imgExReducer } from '@stores/slices/img-ex';
import { userReducer } from '@stores/slices/user';
import { videoReducers } from '@stores/slices/video';
import { wordExReducer } from '@stores/slices/word-ex';
import { combineReducers } from 'redux';
import { storyReducers } from '@stores/slices/story';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducers,
  user: userReducer,
  wordEx: wordExReducer,
  imgEx: imgExReducer,
  voiceEx: voiceExReducer,
  story: storyReducers,
});

export default rootReducer;
