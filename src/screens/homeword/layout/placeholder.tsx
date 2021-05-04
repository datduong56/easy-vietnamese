import { Color } from '@const/color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MARGIN_LEFT, MARGIN_TOP, Offset, WORD_HEIGHT } from './index';

interface PlaceholderProps {
  offset: Offset;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.grey15,
    position: 'absolute',
    borderRadius: 8,
  },
});

const Placeholder = ({ offset }: PlaceholderProps) => {
  return (
    <View
      style={[
        {
          top: offset.originalY.value + MARGIN_TOP + 2,
          left: offset.originalX.value - MARGIN_LEFT + 2,
          width: offset.width.value - 4,
          height: WORD_HEIGHT - 4,
        },
        styles.root,
      ]}
    />
  );
};

export default Placeholder;
