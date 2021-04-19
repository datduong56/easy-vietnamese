import { Color } from '@const/color';
import { Icon } from '@const/icon';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    root: { alignItems: 'center', paddingHorizontal: 16, backgroundColor: Color.white, paddingVertical: 16, elevation: 2 },
    image: { marginBottom: 8, height: 130, width: 130 },
    title: { fontSize: 26, fontWeight: 'bold' },
    description: { textAlign: 'center' },
  });

const MyRank = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <Image source={Icon.bronzeRankingIcon} style={styles.image} />
      <Text style={styles.title}>Your Ranking</Text>
      <Text style={styles.description}>Compete against other players in the weekly rankings</Text>
    </View>
  );
};

export default MyRank;
