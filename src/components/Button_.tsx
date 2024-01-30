import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type ButtonType = {
  title: string;
  handler: () => void;
  buttonColor: string;
};
const Button_ = ({title, handler, buttonColor}: ButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: buttonColor}]}
      onPress={handler}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button_;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#4CAF50', // Green color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
