import ProgressBar from '@components/progress-bar';
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  root: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginRight: 8,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  backButton: {
    height: 44,
    width: 44,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 18,
  },
  headerBar: { flexDirection: 'row', alignItems: 'center' },
  progressBar: { flex: 1, marginRight: 16, marginBottom: 8 },
});

const Header = () => {
  const { goBack } = useNavigation();

  const sound = new Sound(require('@assets/sound.mp3'));

  const playSound = () => {
    sound.play();
  };

  return (
    <>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image source={Icon.closeIcon} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <ProgressBar step={Math.floor(Math.random() * 32 + 1)} steps={32} />
        </View>
      </View>
      <View style={styles.root}>
        <Text style={styles.title}>Translate this sentence:</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={playSound}>
            <LinearGradient colors={Color.linearGradient} style={styles.icon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Image source={Icon.speakerIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Bạn đang ở đâu?</Text>
        </View>
      </View>
    </>
  );
};

export default Header;
