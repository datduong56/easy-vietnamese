import { Color } from '@const/color';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const useStyle = () =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: Color.dark },
  });

const Video = () => {
  const styles = useStyle();

  return (
    <View style={styles.root}>
      <Text>Ahihihi</Text>
    </View>
  );
};

export default Video;
