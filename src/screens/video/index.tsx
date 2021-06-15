/* eslint-disable react-native/no-inline-styles */
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/native';
import { fetchListVideo, videoActions } from '@stores/slices/video';
import React, { useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const useStyle = () =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: Color.dark, alignItems: 'center' },
  });

const Video = () => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const videoData = useSelector(({ video }) => video.data);
  const meta = useSelector(({ video }) => video.meta);
  const refreshing = useSelector(({ video }) => video.refreshing);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('VideoPlayer', { videoId: item.id });
        }}
        style={{ backgroundColor: '#fff', height: 300, elevation: 10 }}>
        <View>
          <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: Dimensions.get('window').width, height: 250 }} />
          <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 8, right: 8, padding: 2, borderRadius: 4 }}>
            <Text>14:20</Text>
          </View>
        </View>
        <Text style={{ marginTop: 16, marginLeft: 16 }}>{item?.title || 'Hello'}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(fetchListVideo());
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(_, index: number) => `${index}`}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          dispatch(videoActions.refresh());
          dispatch(fetchListVideo());
        }}
        onEndReached={() => {
          if (videoData.length >= meta.itemCount) {
            return;
          }
          dispatch(fetchListVideo({ page: meta.page + 1 }));
        }}
      />
    </View>
  );
};

export default Video;
