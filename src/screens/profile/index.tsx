import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Infomation from './infomation';
import Statistic from './statistic';

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fceabb', '#f8b500']}
        style={{ height: '25%', borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}
        start={{ x: 0.8, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      />
      <Infomation />
      <Statistic />
    </View>
  );
};

export default Profile;
