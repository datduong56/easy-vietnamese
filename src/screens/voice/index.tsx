import ProgressBar from '@components/progress-bar';
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';

import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  root: {
    flex: 1,
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

const VoiceScreen = () => {
  const { goBack } = useNavigation();
  const [isRecord, setRecord] = useState<boolean>();
  const [result, setResult] = useState<string[]>();
  const [error, setError] = useState<SpeechErrorEvent>();
  const sound = new Sound(require('@assets/sound.wav'));

  const playSound = () => {
    sound.play();
  };

  const onSpeechStart = () => {
    setRecord(true);
  };

  const onSpeechEnd = () => {
    setRecord(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setError(e);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResult(e?.value);
  };

  const record = async () => {
    try {
      await Voice.start('vi-VN');
    } catch (e) {
      console.error(e);
    }
  };

  const stop = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;

  console.log(result);

  useEffect(() => {
    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

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

        <Text>{!!result && result[0]}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: Color.tintColor1,
            width: 100,
            height: 100,
            borderRadius: 16,
            position: 'absolute',
            bottom: 40,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPressIn={() => record()}
          onPressOut={() => stop()}>
          <Image source={Icon.micIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VoiceScreen;
