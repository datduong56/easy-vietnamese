import { Color } from '@const/color';
import { Icon } from '@const/icon';
import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RankingData } from './data-test';
import MyRank from './my-rank';

const useStyle = () =>
  StyleSheet.create({
    root: { flex: 1 },
    icon: { height: 32, width: 32 },
    avatar: { height: 50, width: 50, borderRadius: 25, marginLeft: 4, marginRight: 16 },
    numerical: { width: 32, textAlign: 'center', fontWeight: 'bold' },
  });

const Ranking = () => {
  const styles = useStyle();
  const numericalOrder = (index: number) => {
    if (index === 0) return <Image source={Icon.oneIcon} style={styles.icon} />;
    if (index === 1) return <Image source={Icon.twoIcon} style={styles.icon} />;
    if (index === 2) return <Image source={Icon.threeIcon} style={styles.icon} />;
    if (index < 10) return <Text style={[{ color: Color.green }, styles.numerical]}>{index + 1}</Text>;
    if (index < 25) return <Text style={[{ color: Color.black }, styles.numerical]}>{index + 1}</Text>;
    return <Text style={[{ color: Color.red }, styles.numerical]}>{index + 1}</Text>;
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6, flex: 1 }}>
          {numericalOrder(index)}
          <FastImage source={{ uri: item.avatar }} style={styles.avatar} />
          <Text numberOfLines={1}>{item.name}</Text>
        </View>
        <Text style={{ marginHorizontal: 16, fontWeight: 'bold' }}>{item.exp} exp</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <MyRank />
      <FlatList renderItem={renderItem} data={RankingData} />
    </View>
  );
};

export default Ranking;
