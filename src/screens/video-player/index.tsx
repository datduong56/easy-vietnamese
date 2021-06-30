/* eslint-disable react-native/no-inline-styles */
import { Color } from '@const/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const Player = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const path = route?.params?.path;

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VideoPlayer source={{ uri: path }} seekColor={Color.tintColor1} disableFullscreen={true} navigator={navigation} />
    </View>
  );
};

export default Player;
