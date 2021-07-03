import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import NavBar from '@components/nav-bar';
import SoundPlayer from 'react-native-sound-player';
import { BASE_URL } from '@const/const';
import { RootState } from '@stores/index';
import { useSelector } from 'react-redux';
import { MyAnswer } from '@screens/homeword';
import xorWith from 'lodash/xorWith';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import EZBottomSheet from '@components/ez-bottom-sheet';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  title: { fontSize: 20, color: Color.grey },
  root: { flex: 1, backgroundColor: Color.dark },
  container: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginHorizontal: 16, marginBottom: 24 },
  icon: { marginRight: 8, height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  subTitle: { fontSize: 18 },
  marginHorizontal2: { marginHorizontal: 2 },
  buttonWarper: { flex: 1, justifyContent: 'center' },
  buttonMicrophone: {
    backgroundColor: Color.tintColor1,
    width: 160,
    height: 160,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  hint: { color: Color.grey, marginHorizontal: 16, textAlign: 'center', marginVertical: 8 },
});

const VoiceScreen = () => {
  const { goBack } = useNavigation();

  const [isRecord, setRecord] = useState<boolean>();
  const [result, setResult] = useState<string[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [myAnswer, setMyAnswer] = useState<MyAnswer>({ text: [] });
  const { data, fetching } = useSelector((state: RootState) => state.voiceEx);

  const scale = useRef(new Animated.Value(1)).current;

  const playSound = () => {
    SoundPlayer.loadUrl(`${BASE_URL}uploads/${data[currentIndex]?.voice}.mp3`);
    SoundPlayer.addEventListener('FinishedLoadingURL', () => {
      SoundPlayer.play();
    });
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResult(e.value);
    setVisible(true);
  };

  const onSpeechVolumeChanged = (e: any) => {
    if (e.value >= 0) {
      const value = e.value > 3 ? 3 : e.value;
      Animated.timing(scale, {
        toValue: value,
        duration: 500,
        useNativeDriver: true,
      }).start(() => scale.setValue(1));
    }
  };

  const record = async () => {
    try {
      setRecord(true);
      setResult([]);
      await Voice.start('vi-VN');
    } catch (e) {
      console.error(e);
    }
  };

  const stop = async () => {
    try {
      await Voice.stop();
      setRecord(false);
    } catch (e) {
      console.error(e);
    }
  };

  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  const unMount = async () => {
    await Voice.destroy();
  };

  const check = async () => {
    const isAvailable = await Voice.isAvailable();
    console.log(isAvailable);
  };

  useEffect(() => {
    check();
    return () => {
      unMount();
    };
  }, []);

  useEffect(() => {
    if (!!result && result?.length !== 0 && !isRecord) {
      const text = result[0].split(' ').map((x, i) => ({ label: x, id: i }));
      const answer: { label: string; id: number }[] = data[currentIndex]?.sentence;
      const diff = xorWith(answer, text, isEqual);
      if (isEmpty(diff)) {
        setMyAnswer(old => ({ ...old, text, error: [], result: 'success' }));
        return;
      }
      setMyAnswer(old => ({ ...old, text, error: diff, result: 'error' }));
    }
  }, [result, isRecord, data, currentIndex]);

  return fetching ? (
    <View style={styles.root}>
      <LottieView source={require('@assets/animations/searching.json')} autoPlay loop speed={2} />
    </View>
  ) : (
    <>
      <NavBar style={{ backgroundColor: Color.dark }} onPress={goBack} step={currentIndex + 1} steps={2} />
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={playSound}>
            <LinearGradient colors={Color.linearGradient} style={styles.icon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Image source={Icon.speakerIcon} />
            </LinearGradient>
          </TouchableOpacity>
          {data[currentIndex]?.sentence?.map((x: { label: string; id: number }) => (
            <Text key={x.id} style={[styles.title, styles.marginHorizontal2]}>
              {x.label}
            </Text>
          ))}
        </View>
        <View style={styles.buttonWarper}>
          <TouchableOpacity style={styles.buttonMicrophone} onPressIn={() => record()} onPressOut={() => stop()}>
            <Animated.Image source={Icon.micIcon} style={{ transform: [{ scale }] }} />
          </TouchableOpacity>
          <Text style={styles.hint}>To do this exercise, press and hold the microphone to speak and release to show the result</Text>
        </View>
        <EZBottomSheet
          isVisible={isVisible}
          onSuccessButtonPress={() => {
            setVisible(false);
            setTimeout(() => {
              setCurrentIndex(oldIndex => oldIndex + 1);
              setMyAnswer({ text: [], error: [] });
            }, 100);
          }}
          type={myAnswer.result || 'error'}
          myAnswer={{ ...myAnswer, answer: data[currentIndex]?.sentence }}
        />
      </View>
    </>
  );
};

export default VoiceScreen;
