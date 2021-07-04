/* eslint-disable react-native/no-inline-styles */
import HorizontalList from '@components/horizontal-list';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@stores/index';
import { fetchListStoryCategory } from '@stores/slices/story';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

const Stories = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListStoryCategory());
  }, []);

  const { categories, fetching } = useSelector((state: RootState) => state.story);

  return fetching ? (
    <View style={{ flex: 1, backgroundColor: Color.dark, justifyContent: 'center' }}>
      <LottieView source={require('@assets/animations/story_loading.json')} autoPlay loop />
    </View>
  ) : (
    <ScrollView style={{ flex: 1, backgroundColor: Color.dark }}>
      {categories.map(category => (
        <HorizontalList
          data={category.stories}
          label={category.name}
          keyExtractor={item => `${item}`}
          trailingButtonPress={() =>
            navigate('StoriesList', {
              id: category.id,
            })
          }
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ height: 300 }}
                onPress={() => {
                  navigate('StoryDetail', {
                    id: item.id,
                    name: item.name,
                  });
                }}>
                <FastImage
                  source={{ uri: item.covers ? item.covers[0] : '' }}
                  style={{ width: Dimensions.get('window').width / 2, height: 300 }}
                  resizeMode={'cover'}
                />
                <LinearGradient
                  colors={['#00000000', '#000000']}
                  style={{
                    width: Dimensions.get('window').width / 2,
                    height: 300,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                  }}>
                  <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16, marginTop: '125%' }}>{item.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />
      ))}
    </ScrollView>
  );
};

export default Stories;
