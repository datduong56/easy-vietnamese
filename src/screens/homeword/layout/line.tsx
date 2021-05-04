import { Color } from '@const/color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { WORD_HEIGHT, NUMBER_OF_LINES } from './index';

const styles = StyleSheet.create({
  root: {
    height: 2,
    backgroundColor: Color.grey15,
  },
});

const Lines = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => (
        <View key={index * WORD_HEIGHT} style={[{ top: index * WORD_HEIGHT - 2 }, styles.root]} />
      ))}
    </View>
  );
};

export default Lines;
