import EZBottomSheet from '@components/ez-bottom-sheet';
import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
import { RootState } from '@stores/index';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { Icon } from '@const/icon';
import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';
import isEmpty from 'lodash/isEmpty';
import { MyAnswer } from '@screens/homeword';

const styles = StyleSheet.create({
  root: { backgroundColor: Color.dark, flex: 1 },
  containerRoot: { flex: 1, justifyContent: 'space-between' },
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
  marginTop24: { marginTop: 24 },
  buttonSpeak: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  buttonSpeakBig: {
    height: 110,
    width: 110,
    backgroundColor: Color.tintColor1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  textSpeak: { color: Color.grey, alignSelf: 'center', marginVertical: 8, lineHeight: 20, fontSize: 18 },
  buttonSpeakSmall: {
    height: 90,
    width: 90,
    backgroundColor: Color.tintColor1,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  textSpeakSmall: { color: Color.grey, position: 'absolute', bottom: -6, alignSelf: 'center', lineHeight: 20, fontSize: 18 },
  textInput: {
    height: 150,
    borderWidth: 3,
    borderColor: Color.tintColor1,
    borderRadius: 8,
    marginHorizontal: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    color: Color.grey,
  },
});

const Listen = () => {
  const { goBack } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [myAnswer, setMyAnswer] = useState<MyAnswer>({ text: [] });
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const { data, fetching } = useSelector((state: RootState) => state.listenEx);

  const checkAnswer = () => {
    const answer = data[currentIndex].sentence;
    const myAns = text.split(' ').map((x, i) => ({ label: x, id: i }));
    const diff = xorWith(answer, myAns, isEqual);
    if (isEmpty(diff)) {
      setMyAnswer({ text: myAns, error: [], result: 'success' });
      setShowAnswer(true);
      return;
    }
    setMyAnswer({ text: myAns, error: diff, result: 'error' });
    setShowAnswer(true);
  };

  return fetching ? (
    <View style={styles.root}>
      <LottieView source={require('@assets/animations/searching.json')} autoPlay loop speed={2} />
    </View>
  ) : (
    <>
      <NavBar onPress={goBack} step={1} steps={1} style={{ backgroundColor: Color.dark }} />
      <KeyboardAwareScrollView style={styles.root} contentContainerStyle={styles.containerRoot}>
        <View style={styles.marginTop24}>
          <View style={styles.buttonSpeak}>
            <View>
              <TouchableOpacity style={styles.buttonSpeakBig}>
                <Image source={Icon.volumeIcon} style={{ transform: [{ rotateY: '180deg' }] }} />
              </TouchableOpacity>
              <Text style={styles.textSpeak}>Normal</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.buttonSpeakSmall}>
                <Image source={Icon.volumeIcon} style={{ transform: [{ rotateY: '180deg' }, { scale: 0.7 }] }} />
              </TouchableOpacity>
              <Text style={styles.textSpeakSmall}>Slow</Text>
            </View>
          </View>
          <TextInput
            multiline
            underlineColorAndroid={'transparent'}
            numberOfLines={2}
            style={styles.textInput}
            placeholder={'Nhập đáp án mà bạn nghe được!'}
            placeholderTextColor={Color.grey}
            onChangeText={txt => setText(txt)}
          />
        </View>
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={checkAnswer} />
      </KeyboardAwareScrollView>
      <EZBottomSheet
        isVisible={isShowAnswer}
        onSuccessButtonPress={() => {
          setShowAnswer(false);
          setText('');
          setTimeout(() => {
            setCurrentIndex(oldIndex => oldIndex + 1);
          }, 100);
        }}
        type={myAnswer?.result || 'success'}
        myAnswer={{ ...myAnswer, answer: data[currentIndex].sentence }}
      />
    </>
  );
};

export default Listen;
