import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'const/icon';
import Home from '@screens/home';
import Profile from '@screens/profile';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Color } from '@const/color';
import Video from '@screens/video';
import Game from '@screens/game';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabbarContainer: {
    height: 60,
    backgroundColor: Color.dark,
  },
});

const BottomTabbar = () => {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false, style: styles.tabbarContainer }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <Image source={Icon.homeIcon} style={{ tintColor: focused ? Color.tintColor1 : Color.grey }} />,
        }}
      />
      <Tab.Screen
        name="Video"
        component={Video}
        options={{
          tabBarIcon: ({ focused }) => <Image source={Icon.videoIcon} style={{ tintColor: focused ? Color.tintColor1 : Color.grey }} />,
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ focused }) => <Image source={Icon.gameIcon} style={{ tintColor: focused ? Color.tintColor1 : Color.grey }} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <Image source={Icon.profileIcon} style={{ tintColor: focused ? Color.tintColor1 : Color.grey }} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabbar;
