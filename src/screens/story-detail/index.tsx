import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from '@stores/index';
import { fetchListStoryChapters, fetchMoreListStoryChapters, fetchStoryDetail } from '@stores/slices/story';
import React, { useEffect, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { Icon } from '@const/icon';

const StoryDetail = () => {
  const route: any = useRoute();
  const id: number = Number(route.params.id);
  const name = route.params.name;
  const dispatch = useDispatch();
  const pagerRef = useRef(null);
  const { goBack } = useNavigation();

  useEffect(() => {
    dispatch(fetchStoryDetail(id));
    dispatch(fetchListStoryChapters(id));
  }, [id]);

  const story = useSelector((state: RootState) => state.story.storyDetail);
  const { data, meta } = useSelector((state: RootState) => state.story.chapters);

  if (!story) {
    return <></>;
  }

  const handleLoadMore = () => {
    if (meta.page >= meta.pageCount) {
      return;
    }
    dispatch(
      fetchMoreListStoryChapters({
        storyId: id,
        take: meta.take,
        page: meta.page + 1,
      }),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 16, alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row' }}>
        <TouchableOpacity onPress={goBack}>
          <Image source={Icon.arrowNextIcon} style={{ transform: [{ rotateY: '180deg' }], marginRight: 8, tintColor: Color.white }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: Color.white }}>{name}</Text>
      </View>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        onPageSelected={e => {
          const sequence = e.nativeEvent.position + 1;
          if (sequence + 5 > meta.itemCount) {
            handleLoadMore();
          }
        }}
        initialPage={0}
        orientation="horizontal">
        {data.map(chapter => (
          <View key={chapter.id} style={{ flex: 1 }}>
            <HTMLView
              value={`<div>${chapter.content || ''}</div>`}
              stylesheet={{
                div: {
                  color: '#000',
                },
              }}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default StoryDetail;
