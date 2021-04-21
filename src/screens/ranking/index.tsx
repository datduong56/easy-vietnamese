import { Color } from '@const/color';
import { Icon } from '@const/icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
    container: { flexDirection: 'row', alignItems: 'center', marginLeft: 6, flex: 1 },
    exp: { marginHorizontal: 16, fontWeight: 'bold' },
    rowSpecial: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 8 },
    rowSpecialTitle: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 16 },
  });

const Ranking = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const numericalOrder = (index: number) => {
    if (index === 0) {
      return <Image source={Icon.oneIcon} style={styles.icon} />;
    }
    if (index === 1) {
      return <Image source={Icon.twoIcon} style={styles.icon} />;
    }
    if (index === 2) {
      return <Image source={Icon.threeIcon} style={styles.icon} />;
    }
    if (index < 10) {
      return <Text style={[{ color: Color.green }, styles.numerical]}>{index + 1}</Text>;
    }
    if (index < 25) {
      return <Text style={[{ color: Color.black }, styles.numerical]}>{index + 1}</Text>;
    }
    return <Text style={[{ color: Color.red }, styles.numerical]}>{index + 1}</Text>;
  };

  const up = () => (
    <View style={styles.rowSpecial}>
      <Image source={Icon.doubleUpArrowIcon} style={{ tintColor: Color.green }} />
      <Text style={[styles.rowSpecialTitle, { color: Color.green }]}>{t('rankUp')}</Text>
      <Image source={Icon.doubleUpArrowIcon} style={{ tintColor: Color.green }} />
    </View>
  );

  const down = () => (
    <View style={styles.rowSpecial}>
      <Image source={Icon.doubleUpArrowIcon} style={{ tintColor: Color.red, transform: [{ rotate: '180deg' }] }} />
      <Text style={[styles.rowSpecialTitle, { color: Color.red }]}>{t('rankDown')}</Text>
      <Image source={Icon.doubleUpArrowIcon} style={{ tintColor: Color.red, transform: [{ rotate: '180deg' }] }} />
    </View>
  );

  const renderItem = ({ item, index }: { item: { avatar: string; name: string; exp: number }; index: number }) => {
    return (
      <>
        <TouchableOpacity activeOpacity={0.5} style={styles.row}>
          <View style={styles.container}>
            {numericalOrder(index)}
            <FastImage source={{ uri: item.avatar }} style={styles.avatar} />
            <Text numberOfLines={1}>{item.name}</Text>
          </View>
          <Text style={styles.exp}>{item.exp} exp</Text>
        </TouchableOpacity>
        {index === 9 && up()}
        {index === 24 && down()}
      </>
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
