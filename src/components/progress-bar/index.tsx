import { Color } from '@const/color';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarType {
  height?: number;
  step: number;
  steps: number;
  colors?: string[];
}

const styles = StyleSheet.create({
  root: { borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
  container: { flex: 1, borderRadius: 10 },
});

const ProgressBar = ({ height = 20, step, steps, colors }: ProgressBarType) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactive = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [width, reactive, step, steps]);

  return (
    <View style={[{ height }, styles.root]}>
      <AnimatedLinearGradient
        colors={colors || Color.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[{ transform: [{ translateX: animatedValue }] }, styles.container]}
        onLayout={(e: LayoutChangeEvent) => {
          const { width: newWidth } = e.nativeEvent.layout;
          setWidth(newWidth);
        }}
      />
    </View>
  );
};

export default ProgressBar;
