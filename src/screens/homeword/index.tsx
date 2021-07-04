/* eslint-disable react-native/no-inline-styles */
import EZBottomSheet, { EZBottomSheetType } from '@components/ez-bottom-sheet';
import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@stores/index';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DraxProvider, DraxSnapbackTargetPreset, DraxView } from 'react-native-drax';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import WordBlock from './word';
import LottieView from 'lottie-react-native';
import { BASE_URL } from '@const/const';
import SoundPlayer from 'react-native-sound-player';
import xorWith from 'lodash/xorWith';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.dark },
  button: { width: '70%', alignSelf: 'center', marginBottom: 24 },
  titleButton: { textAlign: 'center' },
  title: { fontSize: 20, color: Color.grey },
  icon: { marginRight: 8, height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  top65: { top: '65%' },
  top32: { top: '32.5%' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginHorizontal: 16, marginBottom: 24 },
  underline: { position: 'absolute', height: 1, width: Dimensions.get('window').width - 32, marginHorizontal: 16, backgroundColor: Color.tintColor1 },
  dragContainer: { height: '20%' },
  text: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Color.grey,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  textContainer: { flex: 1, marginHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap' },
  wordContainer: { marginHorizontal: 16, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' },
  wordWarper: { flex: 1, justifyContent: 'space-between' },
});

export interface MyAnswer {
  text: { label: string; id: number }[];
  result?: EZBottomSheetType;
  error?: { label: string; id: number }[];
}

const Homework = () => {
  const { goBack } = useNavigation();
  const [myAnswer, setMyAnswer] = useState<MyAnswer>({ text: [] });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [result, setResult] = useState({ show: false, correct: 0, incorrect: 0, time: '' });

  const { data, fetching, currentTime } = useSelector((state: RootState) => state.wordEx);

  const playSound = () => {
    SoundPlayer.loadUrl(`${BASE_URL}uploads/${data[currentIndex]?.voice}.mp3`);
    SoundPlayer.addEventListener('FinishedLoadingURL', () => {
      SoundPlayer.play();
    });
  };

  const checkAnswer = () => {
    const answer: { label: string; id: number }[] = data[currentIndex].answer;
    const diff = xorWith(answer, myAnswer.text, isEqual);
    if (isEmpty(diff)) {
      setMyAnswer(old => ({ ...old, error: [], result: 'success' }));
      setShowAnswer(true);
      setResult(old => ({ ...old, correct: old.correct + 1 }));
      return;
    }
    setMyAnswer(old => ({ ...old, error: diff, result: 'error' }));
    setResult(old => ({ ...old, incorrect: old.incorrect + 1 }));
    setShowAnswer(true);
  };

  useEffect(() => {
    if (currentIndex === data.length && !fetching) {
      const startTime = moment(currentTime);
      const endTime = moment(new Date());
      const time = moment(endTime.diff(startTime)).format('m [minute] ss [second]');
      setResult(old => ({ ...old, show: true, time }));
    }
  }, [currentIndex, fetching]);

  return fetching ? (
    <View style={styles.root}>
      <LottieView source={require('@assets/animations/searching.json')} autoPlay loop speed={2} />
    </View>
  ) : result.show ? (
    <View style={[styles.root, { justifyContent: 'center' }]}>
      <View style={{ marginBottom: 24, alignSelf: 'center' }}>
        <Text
          style={{ textAlign: 'center', alignSelf: 'center', fontSize: 24, lineHeight: 24, color: Color.grey, marginBottom: 12, fontWeight: 'bold' }}>
          Summary
        </Text>
        <Text style={{ color: Color.grey, fontSize: 18, lineHeight: 18 }}>Practice time: {result.time}</Text>
        <Text style={{ color: Color.grey, fontSize: 18, lineHeight: 18 }}>Correct answer: {result.correct}</Text>
        <Text style={{ color: Color.grey, fontSize: 18, lineHeight: 18 }}>Incorrect answer: {result.incorrect}</Text>
      </View>
      <EZButton title={'Go back'} style={styles.button} titleStyle={styles.titleButton} onPress={goBack} />
    </View>
  ) : (
    <>
      <DraxProvider>
        <View style={styles.root}>
          <NavBar style={{ backgroundColor: Color.dark }} onPress={goBack} step={currentIndex + 1} steps={data.length} />
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={playSound}>
              <LinearGradient colors={Color.linearGradient} style={styles.icon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Image source={Icon.speakerIcon} />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.title}>{data[currentIndex]?.question}</Text>
          </View>
          <DraxView
            style={styles.dragContainer}
            renderContent={() => {
              return (
                <>
                  <View style={styles.textContainer}>
                    {myAnswer?.text?.map((x, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          const newText = myAnswer.text.filter(a => a.label !== x.label);
                          setMyAnswer(old => ({ ...old, text: newText }));
                        }}
                        style={styles.text}>
                        <Text style={{ color: Color.grey }}>{x.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={[styles.underline, styles.top32]} />
                  <View style={[styles.underline, styles.top65]} />
                </>
              );
            }}
            onReceiveDragDrop={event => {
              const { name } = event.dragged.payload;
              const oldText = myAnswer.text.map(x => x.label);
              setMyAnswer(old => ({ ...old, text: [...oldText, name].map((x, i) => ({ label: x, id: i })) }));
              return DraxSnapbackTargetPreset.None;
            }}
          />
          <View style={styles.wordWarper}>
            <View style={styles.wordContainer}>
              {data[currentIndex]?.keywords?.split(' ')?.map((item: string, index: number) => {
                const exitBlock = myAnswer.text.findIndex(x => x.label === item);
                return <WordBlock noDrax={exitBlock !== -1} key={index} name={item} />;
              })}
            </View>
            <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => checkAnswer()} />
          </View>
        </View>
      </DraxProvider>
      <EZBottomSheet
        isVisible={isShowAnswer}
        onSuccessButtonPress={() => {
          setShowAnswer(false);
          setTimeout(() => {
            setCurrentIndex(oldIndex => oldIndex + 1);
            setMyAnswer({ text: [], error: [] });
          }, 100);
        }}
        onTryAgainButtonPress={() => {
          setShowAnswer(false);
          setMyAnswer({ text: [], error: [] });
        }}
        type={myAnswer.result || 'error'}
        myAnswer={{ ...myAnswer, answer: data[currentIndex]?.answer }}
      />
    </>
  );
};

export default Homework;
