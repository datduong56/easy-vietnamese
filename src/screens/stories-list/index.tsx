/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { RootState } from '@stores/index';
import { fetchListStory, fetchMoreListStory, fetchStoryCategoryDetail } from '@stores/slices/story';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

const StoriesList = () => {
  const { navigate } = useNavigation();
  const route: any = useRoute();
  const id: number = Number(route.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoryCategoryDetail(id));
    dispatch(fetchListStory(id));
  }, [id]);

  const category = useSelector((state: RootState) => state.story.categoryDetails);
  const { data, meta } = useSelector((state: RootState) => state.story.stories);

  if (!category) {
    return <></>;
  }

  const handleOnEndReached = () => {
    if (meta.page >= meta.pageCount) {
      return;
    }
    dispatch(
      fetchMoreListStory({
        categoryId: id,
        take: meta.take,
        page: meta.page + 1,
      }),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 16, justifyContent: 'center', paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{category.name}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => `${item}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReached={handleOnEndReached}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ width: 200, height: 300 }}
              onPress={() => {
                navigate('StoryDetail', {
                  id: item.id,
                });
              }}>
              <FastImage source={{ uri: item.covers ? item.covers[0] : '' }} style={{ width: 200, height: 300 }} />
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ width: 200, height: 300, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16, marginTop: '125%' }}>{item.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default StoriesList;
