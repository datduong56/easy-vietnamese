import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PICTURE_DATA } from './pictureData';

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

interface PictureHomeworkType {
  id: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  answer: string;
}

const Picture = () => {
  const { goBack } = useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chosenAnswer, setChosenAnswer] = useState<number>();

  const renderPictureHomeWork = ({ item, index }: { item: PictureHomeworkType; index: number }) => {
    return (
      <TouchableOpacity
        style={[styles.question, { borderColor: chosenAnswer === index ? Color.yellow : Color.grey15 }]}
        onPress={() => setChosenAnswer(index)}>
        <View style={styles.questionImageContainer}>
          <FastImage source={{ uri: item.picture }} style={styles.questionImage} />
        </View>
        <View style={styles.answerContainer}>
          <Text style={[styles.answer, { color: chosenAnswer === index ? Color.yellow : Color.grey }]}>{item.answer}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <NavBar onPress={goBack} step={currentIndex + 1} steps={PICTURE_DATA.length} style={{ backgroundColor: Color.dark }} />
      <View style={styles.root}>
        <Text style={styles.title}>Đâu là con "Cua"?</Text>
        <FlatList
          columnWrapperStyle={styles.questionWarper}
          data={PICTURE_DATA[currentIndex].question}
          renderItem={renderPictureHomeWork}
          numColumns={2}
          style={styles.margin8}
          ItemSeparatorComponent={() => <View style={styles.space} />}
          contentContainerStyle={styles.flex}
        />
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => {}} />
      </View>
    </>
  );
};

export default Picture;
