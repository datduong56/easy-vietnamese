import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/core';
import { setToken } from '@services/connection-instance';
import { login } from '@stores/slices/auth';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import List from './list';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingTop: StatusBar.currentHeight, backgroundColor: Color.dark },
  titleContainer: { position: 'absolute', top: height / 2 - ITEM_HEIGHT * 2, width: width * 0.7, paddingHorizontal: 16 },
  title: { color: Color.tintColor1, fontSize: 52, fontWeight: '700', lineHeight: 52 },
  iconList: { position: 'absolute', backgroundColor: Color.tintColor1, width, height: ITEM_HEIGHT, top: height / 2 - ITEM_HEIGHT / 2 },
  buttonContainer: { position: 'absolute', top: height / 2 + ITEM_HEIGHT / 2, paddingHorizontal: 16 },
  line: { height: ITEM_HEIGHT * 2, width: 4, backgroundColor: Color.tintColor1 },
  button: { paddingVertical: 10, paddingHorizontal: 12, backgroundColor: Color.tintColor1, alignItems: 'center', justifyContent: 'center' },
  buttonTitle: { fontSize: 32, fontWeight: '800', color: Color.dark },
});

const data = [
  {
    icon: Icon.phoneIcon,
    name: 'Phone',
  },
  {
    icon: Icon.googleIcon,
    name: 'Google',
  },
  {
    icon: Icon.facebookIcon,
    name: 'FaceBook',
  },
];

const Login = () => {
  const darkRef = useRef<any>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });

  const [currentLoginMethod, setCurrentLoginMethod] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollY.addListener(v => {
      if (darkRef && darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });

    return () => scrollY.removeListener(unsubscribe);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login with...</Text>
      </View>
      <List
        color={Color.tintColor1}
        style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
        data={data}
        onItemIndexChange={current => setCurrentLoginMethod(current)}
      />
      <List ref={darkRef} color={Color.dark} data={data} showText style={styles.iconList} />
      <View style={styles.buttonContainer}>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => {
            dispatch(login({ loginMethod: currentLoginMethod }));
          }}
          style={styles.button}
          activeOpacity={0.8}>
          <Text style={styles.buttonTitle}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
