/* eslint-disable react-native/no-inline-styles */
import HorizontalList from '@components/horizontal-list';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@stores/index';
import { fetchListStoryCategory } from '@stores/slices/story';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};

const Stories = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListStoryCategory());
  }, []);

  const categories = useSelector((state: RootState) => state.story.categories);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      {categories.map(category => (
        <HorizontalList
          data={category.stories}
          label={category.name}
          keyExtractor={item => `${item}`}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          trailingButtonPress={() =>
            navigate('StoriesList', {
              id: category.id,
            })
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate('StoryDetail', {
                    id: item.id,
                  });
                }}
                style={{ padding: 10, borderRadius: 16, elevation: 10, backgroundColor: '#fff' }}>
                <FastImage source={{ uri: item.covers ? item.covers[0] : '' }} style={{ width: 200, height: 150, borderRadius: 16 }} />
                <Text style={{ fontSize: 16, color: '#000', marginTop: 16, fontWeight: 'bold' }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ))}
    </ScrollView>
  );
};

export default Stories;
