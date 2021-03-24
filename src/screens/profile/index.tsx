import NavBar from '@components/nav-bar';
import React from 'react';
import { Text, View } from 'react-native';

const Profile = () => {
  return (
    <View>
      <NavBar title={'Profile'} />
      <Text>My profile</Text>
    </View>
  );
};

export default Profile;
