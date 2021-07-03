// import EZBottomSheet, { EZBottomSheetType } from '@components/ez-bottom-sheet';
import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
// import { RootState } from '@stores/index';
import { Answers } from '@stores/slices/img-ex';
import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { Icon } from '@const/icon';

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

interface ChosenAnswer extends Answers {
  index: number;
}

const Listen = () => {
  const { goBack } = useNavigation();
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [chosenAnswer, setChosenAnswer] = useState<ChosenAnswer>();
  // const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  // const [type, setType] = useState<EZBottomSheetType>();
  // const [focused, setFocused] = useState(false);

  const fetching = false;

  // const { data, fetching } = useSelector((state: RootState) => state.imgEx);

  // const checkAnswer = () => {
  //   if (chosenAnswer?.label === data[currentIndex].correctAnswer) {
  //     setType('success');
  //   } else {
  //     setType('error');
  //   }
  //   setShowAnswer(true);
  // };

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
          />
        </View>
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => console.log('aaa')} />
      </KeyboardAwareScrollView>
      {/* <EZBottomSheet
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
      /> */}
    </>
  );
};

export default Listen;
