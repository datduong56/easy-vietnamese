import { Color } from '@const/color';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WORD_HEIGHT } from './layout/index';

const styles = StyleSheet.create({
  root: {
    padding: 4,
  },
  container: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.grey15,
    backgroundColor: Color.white,
    height: WORD_HEIGHT - 8,
  },
  text: {
    fontSize: 18,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: Color.grey15,
    top: 4,
  },
});

interface WordProps {
  id: number;
  word: string;
}

const Word = ({ word }: WordProps) => (
  <View style={styles.root}>
    <View style={styles.container}>
      <Text style={styles.text}>{word}</Text>
    </View>
  </View>
);

export default Word;
