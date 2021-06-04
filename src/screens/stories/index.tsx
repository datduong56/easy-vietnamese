/* eslint-disable react-native/no-inline-styles */
import HorizontalList from '@components/horizontal-list';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};

const Stories = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      <HorizontalList
        data={[...Array(10).keys()]}
        label="Chủ đề 1"
        keyExtractor={item => `${item}`}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        trailingButtonPress={() => navigate('StoriesList')}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ padding: 10, borderRadius: 16, elevation: 10, backgroundColor: '#fff' }}>
              <FastImage source={{ uri: `https://picsum.photos/200?random=${item}` }} style={{ width: 200, height: 150, borderRadius: 16 }} />
              <Text style={{ fontSize: 16, color: '#000', marginTop: 16, fontWeight: 'bold' }}>Tên truyện</Text>
            </TouchableOpacity>
          );
        }}
      />
      <HorizontalList
        data={[...Array(10).keys()]}
        label="Chủ đề 2"
        keyExtractor={item => `${item}`}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        trailingButtonPress={() => navigate('StoriesList')}
        renderItem={({ item }) => {
          return (
            <View style={{ padding: 10, borderRadius: 16, elevation: 10, backgroundColor: '#fff' }}>
              <FastImage source={{ uri: `https://picsum.photos/200?random=${item}` }} style={{ width: 200, height: 150, borderRadius: 16 }} />
              <Text style={{ fontSize: 16, color: '#000', marginTop: 16, fontWeight: 'bold' }}>Tên truyện</Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default Stories;
