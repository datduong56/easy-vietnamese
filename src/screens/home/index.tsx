import EZButton from '@components/ez-button';
import { Color } from '@const/color';
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';
import { DATA } from './data-test';
import Header from './header';

const useStyle = () =>
  StyleSheet.create({
    container: { marginHorizontal: 16 },
    itemContainer: {
      backgroundColor: Color.white,
      flexDirection: 'row',
      borderRadius: 16,
      elevation: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginVertical: 8,
    },
    title: { fontSize: 20, textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold', marginVertical: 8 },
    level: { fontSize: 16, fontWeight: 'bold' },
    lesson: { fontSize: 16 },
    button: { marginTop: 16 },
    circularContainer: { marginLeft: 32, flex: 1 / 3, alignItems: 'center', justifyContent: 'center' },
    image: { height: 100, width: 100, borderRadius: 50 },
    space: { height: 60 },
  });

const Home = () => {
  const styles = useStyle();

  const renderItem = ({
    item,
    index,
  }: {
    item: { level: number; totalLevel: number; lesson: number; totalLesson: number; image: string };
    index: number;
  }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={{ flex: 2 / 3 }}>
          <Text style={styles.level}>
            Cấp độ {item.level}/{item.totalLevel}
          </Text>
          <Text style={styles.lesson}>
            Bài học {item.lesson}/{item.totalLesson}
          </Text>
          <EZButton title={'bắt đầu học + 10exp'} style={styles.button} />
        </View>
        <View style={styles.circularContainer}>
          <AnimatedCircularProgress
            size={90}
            width={10}
            fill={(item.lesson / item.totalLesson) * 100}
            rotation={180}
            duration={1000}
            lineCap={'round'}
            backgroundColor={Color.grey15}
            tintColor={Color.tintColor1}
            tintColorSecondary={Color.tintColor2}>
            {() => <FastImage source={{ uri: item.image }} style={styles.image} />}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => `item.${index}`}
        renderItem={renderItem}
        ListFooterComponent={() => <View style={styles.space} />}
        contentContainerStyle={styles.container}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.title}>{title}</Text>}
      />
    </View>
  );
};

export default Home;
