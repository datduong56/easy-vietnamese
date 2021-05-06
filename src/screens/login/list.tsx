import React, { forwardRef } from 'react';
import { Animated, Dimensions, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Item from './item';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

const { height } = Dimensions.get('window');

const useStyle = (showText?: boolean) =>
  StyleSheet.create({
    root: {
      paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
      paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
      paddingHorizontal: 20,
    },
  });

interface ListType {
  showText?: boolean;
  color: string;
  style?: StyleProp<ViewStyle>;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemIndexChange?: (index: number) => void;
  data: { icon: ImageSourcePropType; name: string }[];
}

const List = forwardRef<any, ListType>(({ showText, color, style, onScroll, onItemIndexChange, data }, ref) => {
  const styles = useStyle(showText);
  return (
    <Animated.FlatList
      ref={ref}
      data={data}
      style={style}
      keyExtractor={item => `${item.name}-${item.icon}`}
      bounces={false}
      scrollEnabled={!showText}
      scrollEventThrottle={16}
      onScroll={onScroll}
      decelerationRate="fast"
      snapToInterval={ITEM_HEIGHT}
      showsVerticalScrollIndicator={false}
      renderToHardwareTextureAndroid
      contentContainerStyle={styles.root}
      renderItem={({ item }) => {
        return <Item {...item} color={color} showText={showText} />;
      }}
      onMomentumScrollEnd={ev => {
        const newIndex = Math.round(ev.nativeEvent.contentOffset.y / ITEM_HEIGHT);

        if (onItemIndexChange) {
          onItemIndexChange(newIndex);
        }
      }}
    />
  );
});

export default List;
