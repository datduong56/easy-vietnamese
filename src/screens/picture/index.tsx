import EZBottomSheet, { EZBottomSheetType } from '@components/ez-bottom-sheet';
import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
import { RootState } from '@stores/index';
import { Answers } from '@stores/slices/img-ex';
import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

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

  const { data, fetching } = useSelector((state: RootState) => state.imgEx);

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
    } else {
      setType('error');
    }
    setShowAnswer(true);
  };

  return fetching ? (
    <View style={styles.root}>
      <LottieView source={require('@assets/animations/searching.json')} autoPlay loop speed={2} />
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
