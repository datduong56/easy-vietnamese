/* eslint-disable react-native/no-inline-styles */
import EZButton from '@components/ez-button';
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/native';
import { updateUserInfo } from '@stores/slices/user';
import React, { useState } from 'react';
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';

const UpdateProfile = () => {
  const { goBack, navigate } = useNavigation();
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.user);
  const [displayName, setDisplayName] = useState(userInfo?.displayName);
  const [nationModal, setNationModal] = useState(false);
  const [nation, setNation] = useState(userInfo?.nation);

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, paddingHorizontal: 16, justifyContent: 'space-between', paddingBottom: 64 }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
          <TouchableOpacity onPress={goBack}>
            <Image source={Icon.arrowNextIcon} style={{ transform: [{ rotateY: '180deg' }], marginRight: 8 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Thông tin người dùng</Text>
        </View>
        <TextInput
          placeholder="Tên hiển thị"
          value={displayName}
          onChangeText={setDisplayName}
          style={{ backgroundColor: '#F3F3F3', paddingVertical: 0, height: 50, paddingHorizontal: 16, borderRadius: 8, marginBottom: 16 }}
        />
        <TouchableOpacity
          onPress={() => setNationModal(true)}
          style={{ backgroundColor: '#F3F3F3', height: 50, paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center' }}>
          <Text>{nation}</Text>
        </TouchableOpacity>
      </View>
      <EZButton
        title="Cập nhật"
        onPress={() => {
          dispatch(updateUserInfo({ displayName, nation }));
          navigate('BottomTabbar', { screen: 'Profile' });
        }}
        style={{ width: Dimensions.get('window').width - 32, alignSelf: 'center' }}
      />
      <Modal isVisible={nationModal} onBackdropPress={() => setNationModal(false)} onBackButtonPress={() => setNationModal(false)}>
        <View style={{ backgroundColor: '#FFF', borderRadius: 8 }}>
          {['Vietnam', 'England', 'USA', 'Russia'].map(nation => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setNation(nation);
                  setNationModal(false);
                }}
                style={{ alignItems: 'center', paddingVertical: 16 }}>
                <Text>{nation}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </View>
  );
};

export default UpdateProfile;
