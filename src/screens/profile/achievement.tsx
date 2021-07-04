import UnderlineSpace from '@components/underline-space';
import { Color } from '@const/color';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AchievementList } from './data-test';

const useStyle = () =>
  StyleSheet.create({
    root: { marginVertical: 16, marginHorizontal: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    circular: { marginBottom: -16 },
    achievementContentContainer: { marginLeft: 16, flex: 1 },
    achievementTitle: { fontSize: 18, fontWeight: 'bold' },
    achievementContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 },
    container: { backgroundColor: Color.white, borderRadius: 16, marginTop: 10, flex: 1, paddingVertical: 16 },
  });

const Achievement = () => {
  const { t } = useTranslation();
  const styles = useStyle();

  const renderItem = (item: { title: string; process: number; total: number; level: number; description: string }, index: number) => {
    return (
      <Fragment key={index}>
        <View style={styles.achievementContainer}>
          <AnimatedCircularProgress
            size={90}
            width={10}
            fill={(item.process * 100) / item.total}
            arcSweepAngle={240}
            rotation={240}
            duration={1000}
            lineCap={'round'}
            style={styles.circular}
            backgroundColor={Color.grey15}
            tintColor={Color.tintColor1}
            tintColorSecondary={Color.tintColor2}>
            {() => <Text>{t('level', { level: item.level })}</Text>}
          </AnimatedCircularProgress>
          <View style={styles.achievementContentContainer}>
            <Text style={styles.achievementTitle}>{item.title}</Text>
            <Text style={{ color: Color.grey }}>{item.description}</Text>
          </View>
        </View>
        {index + 1 !== AchievementList.length && <UnderlineSpace />}
      </Fragment>
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{t('achievement')}</Text>
      <View style={styles.container}>{AchievementList.map(renderItem)}</View>
    </View>
  );
};

export default Achievement;
