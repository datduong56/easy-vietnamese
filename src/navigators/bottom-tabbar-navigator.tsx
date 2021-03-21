import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'const/icon';
import Home from '@screens/home';
import Profile from '@screens/profile';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Ranking from '@screens/ranking';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabbarContainer: {
    height: 60,
  },
});

const BottomTabbar = () => {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false, style: styles.tabbarContainer }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <Image source={focused ? Icon.homeIcon : Icon.homeIconDisable} />,
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ focused }) => <Image source={focused ? Icon.rankingIcon : Icon.rankingIconDisable} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <Image source={focused ? Icon.profileIcon : Icon.profileIconDisable} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabbar;
