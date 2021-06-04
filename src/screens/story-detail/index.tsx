import React from 'react';
import { View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';

const StoryDetail = () => {
  return (
    <PagerView style={{ flex: 1 }} initialPage={0} orientation="horizontal">
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <Text>Hello</Text>
      </View>
      <View style={{ backgroundColor: 'green', flex: 1 }}>
        <Text>Hello</Text>
      </View>
      <View style={{ backgroundColor: 'blue', flex: 1 }}>
        <Text>Hello</Text>
      </View>
      <View style={{ backgroundColor: 'orange', flex: 1 }}>
        <Text>Hello</Text>
      </View>
      <View>
        <Text>Hello</Text>
      </View>
    </PagerView>
  );
};

export default StoryDetail;
