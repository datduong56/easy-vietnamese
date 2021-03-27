import { Icon } from 'const/icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

const useStyle = () =>
  StyleSheet.create({
    text: { fontSize: 16, fontWeight: 'bold', color: '#999', marginLeft: 8 },
    container: { marginTop: 100, marginHorizontal: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    statisticContainer: { flex: 1 / 3, alignItems: 'center' },
    statistic: { flexDirection: 'row', alignItems: 'center' },
    icon: { width: 24, height: 24 },
    border: { backgroundColor: '#fff', borderRadius: 16, marginTop: 10, flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  });

const Statistic = () => {
  const { t } = useTranslation();
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('statistic')}</Text>
      <View style={styles.border}>
        <View style={styles.statisticContainer}>
          <Text>{t('streak')}</Text>
          <View style={styles.statistic}>
            <Image source={Icon.starIcon} style={styles.icon} />
            <Text style={styles.text}>4</Text>
          </View>
        </View>
        <View style={styles.statisticContainer}>
          <Text>{t('experience')}</Text>
          <View style={styles.statistic}>
            <Image source={Icon.experienceIcon} style={styles.icon} />
            <Text style={styles.text}>300</Text>
          </View>
        </View>
        <View style={styles.statisticContainer}>
          <Text>{t('rank')}</Text>
          <View style={styles.statistic}>
            <Image source={Icon.diplomaIcon} style={styles.icon} />
            <Text style={styles.text}>Bạc</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Statistic;
