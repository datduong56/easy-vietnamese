/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState } from 'react';
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { useSharedValue, runOnUI, runOnJS } from 'react-native-reanimated';
import SharedValue from 'react-native-reanimated';
import SortableWord from './sortable-word';
import Lines from './layout/line';

const containerWidth = Dimensions.get('window').width - 32 * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 32,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    opacity: 0,
  },
});

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

export interface Offset {
  order: SharedValue.SharedValue<number>;
  width: SharedValue.SharedValue<number>;
  x: SharedValue.SharedValue<number>;
  y: SharedValue.SharedValue<number>;
  originalX: SharedValue.SharedValue<number>;
  originalY: SharedValue.SharedValue<number>;
}

const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          console.log(child);
          return (
            <View
              key={index}
              onLayout={(e: LayoutChangeEvent) => {
                const {
                  nativeEvent: {
                    layout: { x, y, width, height },
                  },
                } = e;
                const offset = offsets[index];
                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  'worklet';
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Lines />
      {children.map((child, index) => (
        <SortableWord key={index} offsets={offsets} index={index} containerWidth={containerWidth}>
          {child}
        </SortableWord>
      ))}
    </View>
  );
};

export default WordList;
