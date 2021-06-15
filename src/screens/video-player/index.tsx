/* eslint-disable react-native/no-inline-styles */
import { RootStackParamList } from '@navigators/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'VideoPlayer'>>();

  const videoId: number | null = params?.videoId;

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: `https://ez-api.deadgroup.dev/video/${videoId}/stream` }}
        paused={false}
        controls={true}
        style={{ aspectRatio: 16 / 9, width: '100%' }}
      />
    </View>
  );
};

export default VideoPlayer;
