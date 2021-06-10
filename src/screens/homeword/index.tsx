import EZButton from '@components/ez-button';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from './layout/header';

const words = [
  { id: 0, word: 'Where' },
  { id: 1, word: 'are' },
  { id: 2, word: 'what' },
  { id: 3, word: 'from' },
  { id: 4, word: 'now' },
  { id: 5, word: 'you' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: { width: '70%', alignSelf: 'center', marginBottom: 24 },
  titleButton: { textAlign: 'center' },
});

const Homework = () => {
  return (
    <View style={styles.container}>
      <Header />
      <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => Alert.alert('Tính năng đang hoàn thiện')} />
    </View>
  );
};

export default Homework;
