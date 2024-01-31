import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/Colors';

type ButtonType = {
  title: string;
  handler?: () => void;
  buttonColor: string;
  outLine: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
};
const Button_ = ({
  title,
  handler,
  buttonColor,
  outLine,
  onPressIn,
  onPressOut,
}: ButtonType) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outLine
          ? {borderColor: buttonColor, borderWidth: 2}
          : {backgroundColor: buttonColor},
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handler}>
      <Text
        style={[
          styles.buttonText,
          outLine
            ? {color: colors.color_secondary}
            : {color: colors.color_background},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button_;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
