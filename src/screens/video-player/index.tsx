import React from 'react';
import { Dimensions, View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
        paused={false}
        controls={true}
        fullscreen={true}
        style={{ aspectRatio: 16 / 9, width: '100%' }}
      />
    </View>
  );
};

export default VideoPlayer;
