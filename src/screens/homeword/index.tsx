import EZButton from '@components/ez-button';
import NavBar from '@components/nav-bar';
import { Color } from '@const/color';
import { Icon } from '@const/icon';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Alert, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { DraxProvider, DraxSnapbackTargetPreset, DraxView } from 'react-native-drax';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import WordBlock from './word';

const words = [
  { id: 0, word: 'Bạn' },
  { id: 1, word: 'đang' },
  { id: 2, word: 'ở' },
  { id: 3, word: 'đâu' },
  { id: 4, word: 'đây' },
  { id: 5, word: 'trong' },
  { id: 6, word: 'sạch' },
  { id: 7, word: 'hoàng' },
  { id: 8, word: 'tôn' },
];

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.dark },
  button: { position: 'absolute', bottom: 0, width: '70%', alignSelf: 'center', marginBottom: 24 },
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
});

const Homework = () => {
  const { goBack } = useNavigation();
  const sound = new Sound(require('@assets/sound.wav'));
  const [text, setText] = useState<string[]>([]);

  const playSound = () => {
    sound.play();
  };

  return (
    <DraxProvider>
      <View style={styles.root}>
        <NavBar style={{ backgroundColor: Color.dark }} onPress={goBack} step={1} steps={10} />
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={playSound}>
            <LinearGradient colors={Color.linearGradient} style={styles.icon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Image source={Icon.speakerIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.title}>Where are you now?</Text>
        </View>
        <DraxView
          style={styles.dragContainer}
          renderContent={() => {
            return (
              <>
                <View style={styles.textContainer}>
                  {text.map((x, i) => (
                    <TouchableOpacity key={i} onPress={() => setText(oldText => oldText.filter(a => a !== x))} style={styles.text}>
                      <Text style={{ color: Color.grey }}>{x}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={[styles.underline, styles.top32]} />
                <View style={[styles.underline, styles.top65]} />
              </>
            );
          }}
          onReceiveDragDrop={event => {
            console.log(event);
            const { name } = event.dragged.payload;
            setText(oldText => [...oldText, name]);
            return DraxSnapbackTargetPreset.None;
          }}
        />

        <View style={styles.wordContainer}>
          {words.map(item => (
            <WordBlock noDrax={text.includes(item.word)} key={item.id} name={item.word} />
          ))}
        </View>
        <EZButton title={'Check'} style={styles.button} titleStyle={styles.titleButton} onPress={() => Alert.alert('Tính năng đang hoàn thiện')} />
      </View>
    </DraxProvider>
  );
};

export default Homework;
