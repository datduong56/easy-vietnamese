import { Color } from '@const/color';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Modal from 'react-native-modal';

const EZBottomSheet = ({ isVisible, onPress, customView }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onPress} style={styles.root} coverScreen statusBarTranslucent backdropOpacity={0} useNativeDriver>
      <StatusBar backgroundColor={Color.white} />
      {customView}
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: { justifyContent: 'flex-end', margin: 0 },
});

export default EZBottomSheet;
