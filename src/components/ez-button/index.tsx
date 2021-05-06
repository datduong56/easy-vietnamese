import { Color } from '@const/color';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface EZButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
}

const useStyle = () =>
  StyleSheet.create({
    root: { borderRadius: 8 },
    container: { width: '100%', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
    title: { fontSize: 16, fontWeight: 'bold', lineHeight: 20, textAlign: 'center' },
  });

const EZButton = ({ title, style, titleStyle, onPress, onLongPress }: EZButtonProps) => {
  const styles = useStyle();
  return (
    <TouchableOpacity style={styles.root} onPress={onPress} onLongPress={onLongPress}>
      <LinearGradient colors={Color.linearGradient} style={[styles.container, style]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EZButton;
