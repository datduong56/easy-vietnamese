import { Color } from '@const/color';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const useStyle = () =>
  StyleSheet.create({
    underline: { borderWidth: 1, borderColor: Color.grey25, marginHorizontal: 16, marginVertical: 8 },
  });

interface UnderlineSpaceProps {
  style?: StyleProp<ViewStyle>;
}

const UnderlineSpace = ({ style }: UnderlineSpaceProps) => {
  const styles = useStyle();

  return <View style={[styles.underline, style]} />;
};

export default UnderlineSpace;
