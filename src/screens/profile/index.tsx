import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { logout } from '@stores/slices/auth';
import { getUserInfo } from '@stores/slices/user';
import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Achievement from './achievement';
import Information from './information';

const useStyle = () =>
  StyleSheet.create({
    bound: { height: 200, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
    iconContainer: { position: 'absolute', right: 16, top: 24 },
    icon: { height: 30, width: 30 },
  });

const Profile = () => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserInfo());
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <LinearGradient colors={Color.linearGradient} style={styles.bound} start={{ x: 0.8, y: 0.1 }} end={{ x: 1, y: 1 }} />
      <Information />
      <View style={{ height: 64 }} />
      <Achievement />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigate('Setting');
        }}>
        <Image source={Icon.settingIcon} style={styles.icon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
