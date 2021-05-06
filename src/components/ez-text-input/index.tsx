import { Color } from '@const/color';
import React, { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface EZTextInputType {
  placeholder?: string;
  isPassword?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  root: { padding: 2, borderRadius: 8 },
  container: { backgroundColor: Color.white, borderRadius: 8, color: Color.black, paddingLeft: 12 },
});

const EZTextInput = ({ placeholder, isPassword, onFocus, onBlur, onChangeText }: EZTextInputType) => {
  const [isFocus, setFocus] = useState<boolean>(false);

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <LinearGradient
      colors={isFocus ? Color.linearGradient : Color.whiteLinearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.root}>
      <TextInput
        style={styles.container}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={Color.grey50}
        secureTextEntry={isPassword}
      />
    </LinearGradient>
  );
};

export default EZTextInput;
