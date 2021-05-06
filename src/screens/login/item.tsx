import React, { memo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 84,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  icon: {
    height: 42,
    width: 42,
  },
});

interface ItemType {
  icon: ImageSourcePropType;
  name: string;
  showText?: boolean;
  color: string;
}

const Item = ({ icon, name, showText, color }: ItemType) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? <Text style={[styles.itemText, { color }]}>{name}</Text> : <View />}
      <Image source={icon} style={[styles.icon, { tintColor: color }]} />
    </View>
  );
};

export default memo(Item);
