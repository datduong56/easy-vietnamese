import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import moment from 'moment';

const useStyles = () =>
  StyleSheet.create({
    container: {
      height: 180,
      marginHorizontal: 16,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 80,
      borderRadius: 16,
      backgroundColor: '#fff',
      flexDirection: 'row',
      elevation: 4,
    },
    avatarContainer: { flex: 2 / 5, alignItems: 'center', justifyContent: 'center', padding: 16 },
    avatar: { width: 150, height: 150, borderRadius: 8 },
    informationContainer: { flex: 3 / 5, justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 16, paddingRight: 16 },
    name: { fontSize: 22, fontWeight: 'bold' },
    descriptionContainer: { flex: 1, justifyContent: 'center' },
  });

const Information = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const userInfo = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <FastImage source={{ uri: userInfo?.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {userInfo?.displayName || 'Chưa có'}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text>
            {t('joined')}: {moment(userInfo?.joined).format('DD/MM/YYYY') || 'Chưa có'}
          </Text>
          <Text>
            {t('national')}: {userInfo?.nation || 'Chưa có'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Information;
