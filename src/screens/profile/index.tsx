import { Color } from '@const/color';
import { Icon } from '@const/icon';
import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Achievement from './achievement';
import Friend from './friend';
import Information from './information';
import Statistic from './statistic';

const useStyle = () =>
  StyleSheet.create({
    bound: { height: 200, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
    iconContainer: { position: 'absolute', right: 16, top: 24 },
    icon: { height: 30, width: 30 },
  });

const Profile = () => {
  const styles = useStyle();
  return (
    <ScrollView>
      <LinearGradient colors={Color.linearGradient} style={styles.bound} start={{ x: 0.8, y: 0.1 }} end={{ x: 1, y: 1 }} />
      <Information />
      <Statistic />
      <Friend />
      <Achievement />
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={Icon.settingIcon} style={styles.icon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
