import EZBottomSheet, { EZBottomSheetType } from '@components/ez-bottom-sheet';
import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
import { RootState } from '@stores/index';
import { Answers } from '@stores/slices/img-ex';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  root: { backgroundColor: Color.dark, flex: 1 },
  title: { fontSize: 20, color: Color.grey, marginBottom: 24, marginLeft: 19 },
  button: { width: '70%', alignSelf: 'center', marginBottom: 24 },
  titleButton: { textAlign: 'center' },
  question: {
    backgroundColor: Color.dark,
    borderRadius: 16,
    width: Dimensions.get('window').width / 2 - 32,
    aspectRatio: 0.75,
    borderWidth: 3,
    elevation: 5,
  },
  questionWarper: { justifyContent: 'space-evenly' },
  questionImageContainer: { flex: 4 / 5, alignItems: 'center', justifyContent: 'center' },
  questionImage: { width: '80%', height: '80%', borderRadius: 8 },
  answerContainer: { flex: 1 / 5, justifyContent: 'center' },
  answer: { textAlign: 'center', fontSize: 15, fontWeight: 'bold' },
  space: { height: 16 },
  flex: { flex: 1 },
  margin8: { marginHorizontal: 8 },
});

interface ChosenAnswer extends Answers {
  index: number;
}

const Picture = () => {
  const { goBack } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chosenAnswer, setChosenAnswer] = useState<ChosenAnswer>();
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [type, setType] = useState<EZBottomSheetType>();
  const [result, setResult] = useState({ show: false, correct: 0, incorrect: 0, time: '' });

  const { data, fetching, currentTime } = useSelector((state: RootState) => state.imgEx);

  const renderPictureHomeWork = ({ item, index }: { item: Answers; index: number }) => {
    return (
      <TouchableOpacity
        style={[styles.question, { borderColor: chosenAnswer?.index === index ? Color.yellow : Color.grey15 }]}
        onPress={() => setChosenAnswer({ ...item, index })}>
        <View style={styles.questionImageContainer}>
          <FastImage source={{ uri: item.image }} style={styles.questionImage} resizeMode={'contain'} />
        </View>
        <View style={styles.answerContainer}>
          <Text style={[styles.answer, { color: chosenAnswer?.index === index ? Color.yellow : Color.grey }]}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const checkAnswer = () => {
    if (chosenAnswer?.label === data[currentIndex].correctAnswer) {
      setType('success');
      setResult(old => ({ ...old, correct: old.correct + 1 }));
    } else {
      setType('error');
      setResult(old => ({ ...old, incorrect: old.incorrect + 1 }));
    }
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
      <NavBar onPress={goBack} step={currentIndex + 1} steps={data.length} style={{ backgroundColor: Color.dark }} />
      <View style={styles.root}>
        <Text style={styles.title}>{`${data[currentIndex]?.question}?`}</Text>
        <FlatList
          columnWrapperStyle={styles.questionWarper}
          data={data[currentIndex]?.answers}
          renderItem={renderPictureHomeWork}
          numColumns={2}
          style={styles.margin8}
          ItemSeparatorComponent={() => <View style={styles.space} />}
          contentContainerStyle={styles.flex}
        />
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={checkAnswer} />
      </View>
      <EZBottomSheet
        isVisible={isShowAnswer}
        onSuccessButtonPress={() => {
          setCurrentIndex(oldIndex => oldIndex + 1);
          setChosenAnswer(undefined);
          setShowAnswer(false);
        }}
        onTryAgainButtonPress={() => {
          setChosenAnswer(undefined);
          setShowAnswer(false);
        }}
        type={type || 'success'}
      />
    </>
  );
};

export default Picture;
