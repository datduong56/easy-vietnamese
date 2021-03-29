import { TabActive } from '@const/enum';
import { Icon } from '@const/icon';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Follower, Following } from './data-test';

const width = Dimensions.get('window').width;

const useStyle = () =>
  StyleSheet.create({
    titleContent: { marginVertical: 8, width: (width - 32) / 2, alignItems: 'center' },
    container: { marginTop: 16, marginHorizontal: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    contentContainer: { backgroundColor: '#fff', borderRadius: 16, marginTop: 10, flex: 1 },
    contentTitleContainer: { flexDirection: 'row', marginBottom: 8 },
    linearContent: { width: '90%', paddingVertical: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    userContainer: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 18, fontWeight: 'bold' },
    experience: { fontSize: 16, fontWeight: 'bold', color: '#999' },
    icon: { tintColor: '#999', position: 'absolute', right: 16 },
    avatar: { height: 60, width: 60, borderRadius: 30, marginHorizontal: 16 },
    underline: { borderWidth: 1, borderColor: '#99999940', marginHorizontal: 16, marginVertical: 8 },
    noFollow: { fontSize: 16, textAlign: 'center', color: '#999', marginBottom: 16, marginTop: 8, fontWeight: 'bold' },
  });

const Friend = () => {
  const { t } = useTranslation();
  const styles = useStyle();
  const [tabActive, setTabActive] = useState<TabActive>(TabActive.Follower);

  const renderItem = (item: { avatar: string; name: string; experience: number }, index: number) => {
    return (
      <Fragment key={index}>
        <TouchableOpacity style={styles.userContainer} activeOpacity={0.7}>
          <FastImage source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.experience}>{`${item.experience}exp`}</Text>
          </View>
          <Image source={Icon.arrowNextIcon} style={styles.icon} />
        </TouchableOpacity>
        {index !== 4 && <View style={styles.underline} />}
      </Fragment>
    );
  };

  const friendList = () => {
    const data = tabActive === TabActive.Follower ? Follower : Following;
    if (isEmpty(data)) {
      return <Text style={styles.noFollow}>{tabActive === TabActive.Follower ? t('notFollowing') : t('noFollowed')}</Text>;
    }
    return data.map(renderItem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friend</Text>
      <View style={styles.contentContainer}>
        <View style={styles.contentTitleContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.titleContent}
            onPress={() => {
              setTabActive(TabActive.Follower);
            }}>
            <LinearGradient
              colors={tabActive === TabActive.Follower ? ['#fceabb', '#f8b500'] : ['#fff', '#fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.linearContent}>
              <Text>{t('follower')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.titleContent}
            onPress={() => {
              setTabActive(TabActive.Following);
            }}>
            <LinearGradient
              colors={tabActive === TabActive.Following ? ['#fceabb', '#f8b500'] : ['#fff', '#fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.linearContent}>
              <Text>{t('following')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {friendList()}
      </View>
    </View>
  );
};

export default Friend;
