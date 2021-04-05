import { Color } from '@const/color';
import { Icon } from '@const/icon';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const useStyle = () =>
  StyleSheet.create({
    root: { height: 50, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8 },
    iconContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, borderRadius: 16 },
    text: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold', color: Color.black },
    icon: { height: 24, width: 24, marginLeft: 12 },
  });

const Header = () => {
  const styles = useStyle();

  return (
    <LinearGradient colors={Color.linearGradient} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={Icon.starIcon} style={styles.icon} />
        <Text style={styles.text}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={Icon.treasureIcon} style={styles.icon} />
        <Text style={styles.text}>1</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;
