/* eslint-disable react-native/no-inline-styles */
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/native';
import { logout } from '@stores/slices/auth';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

const Setting = () => {
  const { goBack, navigate } = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, paddingHorizontal: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
        <TouchableOpacity onPress={goBack}>
          <Image source={Icon.arrowNextIcon} style={{ transform: [{ rotateY: '180deg' }], marginRight: 8 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Thiết lập</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate('UpdateProfile');
        }}
        style={{ padding: 16, backgroundColor: '#F3F3F3', borderRadius: 8 }}>
        <Text>Thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}
        style={{ padding: 16, backgroundColor: '#F3F3F3', borderRadius: 8, marginTop: 16 }}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
