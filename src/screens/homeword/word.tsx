import { Color } from '@const/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedViewStyleProp, DraxView } from 'react-native-drax';

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Color.grey,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  opacity0: { opacity: 0 },
});

const WordBlock = ({ name, style, noDrax = false }: { name: string; style?: AnimatedViewStyleProp; noDrax?: boolean }) => {
  return (
    <>
      {noDrax ? (
        <View style={[styles.root, { backgroundColor: Color.grey }]}>
          <Text style={{ color: Color.grey }}>{name}</Text>
        </View>
      ) : (
        <DraxView style={[styles.root, style]} draggingStyle={styles.opacity0} dragReleasedStyle={styles.opacity0} dragPayload={{ name }}>
          <Text style={{ color: Color.grey }}>{name}</Text>
        </DraxView>
      )}
    </>
  );
};

export default WordBlock;
