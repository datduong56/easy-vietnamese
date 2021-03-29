import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Friend from './friend';
import Infomation from './infomation';
import Statistic from './statistic';

const useStyle = () =>
  StyleSheet.create({
    bound: { height: 200, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
  });

const Profile = () => {
  const styles = useStyle();
  return (
    <ScrollView>
      <LinearGradient colors={['#fceabb', '#f8b500']} style={styles.bound} start={{ x: 0.8, y: 0.1 }} end={{ x: 1, y: 1 }} />
      <Infomation />
      <Statistic />
      <Friend />
    </ScrollView>
  );
};

export default Profile;
