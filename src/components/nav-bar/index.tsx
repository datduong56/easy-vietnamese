import ProgressBar from '@components/progress-bar';
import { Color } from '@const/color';
import { Icon } from 'const/icon';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const useStyles = () =>
  StyleSheet.create({
    backButton: {
      height: 44,
      width: 44,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white },
    progressBar: { flex: 1, marginRight: 16, marginBottom: 8 },
  });

interface NavBarProps {
  onPress: () => void;
  steps: number;
  step: number;
}

const NavBar = ({ onPress, step, steps }: NavBarProps) => {
  const styles = useStyles();

  const progress = useMemo(() => <ProgressBar step={step} steps={steps} />, [step, steps]);

  return (
    <View style={styles.headerBar}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Image source={Icon.closeIcon} />
      </TouchableOpacity>
      <View style={styles.progressBar}>{progress}</View>
    </View>
  );
};

export default NavBar;
