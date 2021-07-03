import { Color } from '@const/color';
import React, { ReactChild } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { MyAnswer } from '@screens/homeword';

export type EZBottomSheetType = 'success' | 'error';

interface MyAnswerError extends MyAnswer {
  answer: { label: string; id: number }[];
}

interface EZBottomSheet {
  isVisible: boolean;
  customView?: ReactChild;
  onSuccessButtonPress?: () => void;
  onTryAgainButtonPress?: () => void;
  myAnswer?: MyAnswerError;
  type: EZBottomSheetType;
}

const EZBottomSheet = ({ isVisible, onSuccessButtonPress, customView, type = 'success', onTryAgainButtonPress, myAnswer }: EZBottomSheet) => {
  const SuccessView = (
    <View style={[styles.container, { backgroundColor: Color.green }]}>
      <Text style={[styles.title, { color: Color.green1 }]}>Correct answer!</Text>
      <LottieView source={require('@assets/animations/tick.json')} autoPlay loop={false} speed={0.7} style={styles.lottie} />
      <TouchableOpacity style={styles.successButton} onPress={onSuccessButtonPress}>
        <Text style={[styles.titleButton, { color: Color.green1 }]}>Next question 🚀</Text>
      </TouchableOpacity>
    </View>
  );

  console.log(myAnswer);

  const showAnswer = () => {
    if (myAnswer?.text && myAnswer.text.length > 0) {
      return (
        <View style={[styles.errorWarper, styles.marginHorizontal]}>
          <Text style={[styles.title, { color: Color.red1 }]}>Incorrect answer!</Text>
          <View style={styles.answerTitle}>
            <Text style={[styles.titleButton, styles.subTitle]}>Answer: </Text>
            {myAnswer.answer?.map(x => {
              const exitBlock = myAnswer.error && myAnswer.error.findIndex(e => x.label === e.label);
              return (
                <Text key={x.id} style={[styles.label, exitBlock !== -1 && styles.border]}>
                  {`${x.label}`}
                </Text>
              );
            })}
          </View>
          <View style={styles.answerTitle}>
            <Text style={[styles.titleButton, styles.subTitle]}>Your answer: </Text>
            {myAnswer.text.map(x => {
              const exitBlock = myAnswer.error && myAnswer.error.findIndex(e => x.label === e.label);
              return (
                <Text key={x.id} style={[styles.label, exitBlock !== -1 && styles.border]}>
                  {`${x.label}`}
                </Text>
              );
            })}
          </View>
          <View style={styles.errorContainer}>
            <TouchableOpacity style={[styles.tryAgainButton]} onPress={onSuccessButtonPress}>
              <Text style={[styles.titleButton, { color: Color.white }]}>Next question 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.errorWarper}>
        <Text style={[styles.title, { color: Color.red1 }]}>No result!</Text>
        <Text style={[styles.answerText, styles.marginHorizontal]}>Please drag and drop the letters onto the two yellow lines</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgainButtonPress}>
          <Text style={[styles.titleButton, { color: Color.white }]}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ErrorView = (
    <View style={[styles.container, { backgroundColor: Color.red }]}>
      {myAnswer ? (
        showAnswer()
      ) : (
        <>
          <Text style={[styles.title, { color: Color.red1 }]}>Incorrect answer!</Text>
          <LottieView source={require('@assets/animations/error.json')} autoPlay loop={false} style={styles.lottie} />
          <View style={styles.errorContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={onSuccessButtonPress}>
              <Text style={[styles.titleButton, { color: Color.green1 }]}>Next question 🚀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgainButtonPress}>
              <Text style={[styles.titleButton, { color: Color.white }]}>Try again</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const render = type === 'success' ? SuccessView : ErrorView;

  return (
    <Modal isVisible={isVisible} style={styles.root} coverScreen statusBarTranslucent backdropOpacity={0} useNativeDriver>
      <View style={styles.warper}>{customView ? customView : render}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  warper: { height: '30%' },
  container: { flex: 1, borderTopLeftRadius: 16, borderTopRightRadius: 16, justifyContent: 'space-evenly' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  lottie: { width: 80, height: 80, alignSelf: 'center' },
  successButton: { width: '50%', borderRadius: 8, alignSelf: 'center', padding: 8, borderWidth: 2, borderColor: Color.green1 },
  titleButton: { textAlign: 'center', fontWeight: 'bold', lineHeight: 20 },
  errorContainer: { flexDirection: 'row', justifyContent: 'center' },
  nextButton: {
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    padding: 8,
    borderWidth: 2,
    borderColor: Color.green1,
    marginHorizontal: 8,
    backgroundColor: Color.white,
  },
  marginHorizontal: { marginHorizontal: 16 },
  answerText: { color: Color.red1, lineHeight: 20, fontSize: 16, textAlign: 'center' },
  tryAgainButton: { borderRadius: 8, width: '40%', alignSelf: 'center', padding: 8, backgroundColor: Color.red1, marginHorizontal: 8 },
  errorWarper: { flex: 1, justifyContent: 'space-evenly' },
  label: { color: Color.red1, marginHorizontal: 2, lineHeight: 20, fontSize: 16 },
  border: { borderBottomWidth: 1 },
  answerTitle: { flexDirection: 'row', alignItems: 'center' },
  subTitle: { fontSize: 20, color: Color.red1 },
});

export default EZBottomSheet;
