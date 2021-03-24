import { Icon } from 'const/icon';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const useStyles = (inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      height: inset.top + 50,
      flexDirection: 'row',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    center: { flex: 4 / 6, alignItems: 'center', justifyContent: 'center' },
    right: { flex: 1 / 6, alignItems: 'center', justifyContent: 'center' },
    left: { flex: 1 / 6 },
    iconContainer: { height: 44, width: 44, alignItems: 'center', justifyContent: 'center' },
    icon: { height: 30, width: 30 },
  });

interface NavBarProps {
  title: string;
  leftButton?: ImageSourcePropType;
  rightButton?: ImageSourcePropType;
  onPressRightButton?: () => void;
  onPressLeftButton?: () => void;
}

const NavBar = ({ title, rightButton, leftButton, onPressRightButton, onPressLeftButton }: NavBarProps) => {
  const inset = useSafeAreaInsets();
  const styles = useStyles(inset);
  return (
    <LinearGradient style={styles.container} colors={['#fceabb', '#f8b500']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <View style={styles.left}>
        {leftButton && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPressLeftButton}>
            <Image source={leftButton} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressRightButton}>
          <Image source={rightButton ? rightButton : Icon.settingIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NavBar;
