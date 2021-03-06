import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Homework from '@screens/homeword';
import Listen from '@screens/listen';
import Picture from '@screens/picture';
import Player from '@screens/video-player';
import Voice from '@screens/voice';
import { setToken } from '@services/connection-instance';
import { authAction } from '@stores/slices/auth';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainStack from './main-stack';

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch();

  const getStoredToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return;
    }
    setToken(token);
    dispatch(authAction.setTokenState(token));
  };

  useEffect(() => {
    getStoredToken();
  }, []);

  return (
    <Stack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="Homework" component={Homework} />
      <Stack.Screen name="Voice" component={Voice} />
      <Stack.Screen name="Picture" component={Picture} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Listen" component={Listen} />
    </Stack.Navigator>
  );
};

export default RootStack;
