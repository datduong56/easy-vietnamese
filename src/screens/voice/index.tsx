import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import xor from 'lodash/xor';
import isEmpty from 'lodash/isEmpty';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import NavBar from '@components/nav-bar';
import EZBottomSheet from '@components/ez-bottom-sheet';

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

enum AnswerType {
  missingLetters = 'Thiếu chữ',
  excessLetters = 'Thừa chữ',
  perversive = 'Sai nghĩa',
  pass = 'Đúng',
}

const VoiceScreen = () => {
  const { goBack } = useNavigation();

  const [isRecord, setRecord] = useState<boolean>();
  const [result, setResult] = useState<string[]>();
  const sound = new Sound(require('@assets/sound.wav'));
  const [isVisible, setVisible] = useState<boolean>(false);
  const [answer, setAnswer] = useState({});
  const [question] = useState('Bạn đang ở đâu'.toLowerCase().split(' '));

  const playSound = () => {
    sound.play();
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResult(e.value);
    setVisible(true);
  };

  const record = async () => {
    try {
      setRecord(true);
      setResult([]);
      const a = await Voice.start('vi-VN');
      console.log('voice', a);
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

  useEffect(() => {
    if (!!result && result?.length !== 0 && !isRecord) {
      const myAnswer = result[0]?.toLowerCase().split(' ');
      if (question.length > myAnswer.length) {
        const diff = question.filter(x => !myAnswer.includes(x));
        setAnswer(oldState => ({ ...oldState, type: AnswerType.missingLetters, error: diff }));
        return;
      }
      if (question.length < myAnswer.length) {
        const diff = myAnswer.filter(x => !question.includes(x));
        setAnswer(oldState => ({ ...oldState, type: AnswerType.excessLetters, error: diff }));
        return;
      }
      const diff = xor(question, myAnswer);
      if (isEmpty(diff)) {
        setAnswer(oldState => ({ ...oldState, type: AnswerType.pass, error: [] }));
        return;
      }
      setAnswer(oldState => ({ ...oldState, type: AnswerType.perversive, error: diff }));
    }
  }, [result, isRecord, question]);

  useEffect(() => {
    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

  return (
    <>
      <NavBar onPress={goBack} step={Math.floor(Math.random() * 32 + 1)} steps={32} />
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
          onPressOut={() => {
            stop();
          }}>
          <Image source={Icon.micIcon} />
        </TouchableOpacity>
      </View>
      <EZBottomSheet
        isVisible={isVisible}
        onPress={() => setVisible(false)}
        customView={
          <View
            style={{
              backgroundColor: Color.white,
              height: Dimensions.get('window').height * 0.2,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Đáp án: </Text>
              {question.map((x, i) => (
                <Text style={[answer?.error?.includes(x) && { borderBottomWidth: 1 }, i === 0 && { textTransform: 'capitalize' }]}>{x} </Text>
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Câu trả lời: </Text>
              {!!result &&
                result[0]
                  ?.split(' ')
                  .map((x, i) => (
                    <Text style={[answer?.error?.includes(x) && { borderBottomWidth: 1 }, i === 0 && { textTransform: 'capitalize' }]}>{x} </Text>
                  ))}
            </View>
            <Text>Kết quả: {answer?.type}</Text>
          </View>
        }
      />
    </>
  );
};

export default VoiceScreen;
