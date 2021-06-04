import { Color } from '@const/color';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const useStyle = () =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: Color.dark },
  });

const Game = () => {
  const styles = useStyle();
  const { navigate } = useNavigation();
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigate('Homework')}
          style={{ height: 100, width: 100, borderRadius: 16, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Ghép chữ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Voice')}
          style={{ height: 100, width: 100, borderRadius: 16, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Luyện nói</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Picture')}
          style={{ height: 100, width: 100, borderRadius: 16, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;
