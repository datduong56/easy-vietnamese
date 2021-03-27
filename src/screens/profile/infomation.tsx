import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const useStyles = () =>
  StyleSheet.create({
    container: {
      height: 180,
      marginHorizontal: 16,
      position: 'absolute',
      right: 0,
      left: 0,
      top: '10%',
      borderRadius: 16,
      backgroundColor: '#fff',
      flexDirection: 'row',
      elevation: 4,
    },
    avatarContainer: { flex: 2 / 5, alignItems: 'center', justifyContent: 'center', padding: 16 },
    avatar: { width: '100%', height: '100%', borderRadius: 8 },
    informationContainer: { flex: 3 / 5, justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 16, paddingRight: 16 },
    name: { fontSize: 22, fontWeight: 'bold' },
    descriptionContainer: { flex: 1, justifyContent: 'center' },
  });

const Infomation = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <FastImage source={{ uri: 'https://i.pravatar.cc/1080' }} style={styles.avatar} />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.name} numberOfLines={2}>
          Đạtt
        </Text>
        <View style={styles.descriptionContainer}>
          <Text>{t('joined')}: ....</Text>
          <Text>{t('following')}: ....</Text>
          <Text>{t('follower')}: ....</Text>
          <Text>{t('national')}: ....</Text>
        </View>
      </View>
    </View>
  );
};

export default Infomation;
