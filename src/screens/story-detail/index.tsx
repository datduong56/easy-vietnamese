import { useRoute } from '@react-navigation/native';
import { RootState } from '@stores/index';
import { fetchListStoryChapters, fetchMoreListStoryChapters, fetchStoryDetail } from '@stores/slices/story';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';

const StoryDetail = () => {
  const route: any = useRoute();
  const id: number = Number(route.params.id);
  const dispatch = useDispatch();
  const pagerRef = useRef(null);

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
  );
};

export default StoryDetail;
