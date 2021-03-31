import NavBar from '@components/nav-bar';
import Tooltip from '@components/tooltip';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  return (
    <View>
      <NavBar title={'Khóa học'} />

      <Tooltip popover={<Text>Tips</Text>}>
        <Text>ahihihihihihih</Text>
      </Tooltip>
    </View>
  );
};

export default Home;
