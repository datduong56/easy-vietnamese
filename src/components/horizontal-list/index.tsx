import { Color } from '@const/color';
import React, { ReactNode } from 'react';
import { FlatListProps, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

interface HorizontalListProps<T> extends FlatListProps<T> {
  label?: string;
  trailingButton?: ReactNode;
  renderLabel?: ReactNode;
  trailingButtonPress?: () => void;
}

function HorizontalList<T>({ label, trailingButtonPress, ...props }: HorizontalListProps<T>) {
  const trailingButton = (
    <TouchableOpacity onPress={trailingButtonPress}>
      <Text style={{ color: Color.white }}>Xem tất cả</Text>
    </TouchableOpacity>
  );

  const renderLabel = <Text style={styles.label}>{label}</Text>;

  return (
    <View style={{ marginTop: 16 }}>
      <View style={styles.labelWrapper}>
        {props.renderLabel || renderLabel}
        {props.trailingButton || trailingButton}
      </View>
      <FlatList<T> horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Color.white,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default HorizontalList;
