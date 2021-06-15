/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const StoriesList = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 16, justifyContent: 'center', paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chủ đề 1</Text>
      </View>
      <FlatList
        data={[...Array(50).keys()]}
        keyExtractor={item => `${item}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ width: 200, height: 300 }}
              onPress={() => {
                navigate('StoryDetail');
              }}>
              <FastImage source={{ uri: `https://picsum.photos/200?random=${item}` }} style={{ width: 200, height: 300 }} />
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ width: 200, height: 300, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16, marginTop: '125%' }}>Hello</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default StoriesList;
