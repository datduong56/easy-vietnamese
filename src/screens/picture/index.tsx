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
  root: { backgroundColor: Color.white, flex: 1 },
  title: { fontSize: 20 },
  button: { width: '70%', alignSelf: 'center', marginBottom: 24 },
  titleButton: { textAlign: 'center' },
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chosenAnswer, setChosenAnswer] = useState<number>();
  const ANSWER_FLAG = ['A', 'B', 'C', 'D'];

  const renderPictureHomeWork = ({ item, index }: { item: PictureHomeworkType; index: number }) => {
    return (
      <TouchableOpacity activeOpacity={1} style={{}} onPress={() => setChosenAnswer(index)}>
        <View
          style={{
            width: Dimensions.get('window').width / 2 - 32,
            aspectRatio: 1,
            borderRadius: 16,
            marginHorizontal: 8,
            marginVertical: 12,
            backgroundColor: Color.white,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <FastImage source={{ uri: item.picture }} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
        </View>
        <TouchableOpacity>
          <Text style={[{ textAlign: 'center' }, { color: chosenAnswer === index ? 'red' : 'black' }]}>
            {ANSWER_FLAG[index]}. {item.answer}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  console.log(currentIndex);

  return (
    <>
      <NavBar onPress={goBack} step={currentIndex + 1} steps={PICTURE_DATA.length} />
      <View style={styles.root}>
        <Text style={styles.title}>Choose the best answer:</Text>
        <FlatList data={PICTURE_DATA[currentIndex].question} renderItem={renderPictureHomeWork} numColumns={2} style={{ marginHorizontal: 8 }} />
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => {}} />
      </View>
    </>
  );
};

export default Picture;
