/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const onBuffer = (data: any) => {
    console.log(data);
  };

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: 'http://192.168.1.10:3000/uploads/ForBiggerBlazes.mp4' }}
        paused={false}
        controls={true}
        style={{ aspectRatio: 16 / 9, width: '100%' }}
        onBuffer={onBuffer}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
      />
    </View>
  );
};

export default VideoPlayer;
