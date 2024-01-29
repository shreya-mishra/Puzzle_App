import {Button, StyleSheet, View} from 'react-native';
import React from 'react';

type ButtonType = {
  title: string;
  handler: () => void;
};
const Button_ = ({title, handler}: ButtonType) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={handler} />
    </View>
  );
};

export default Button_;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
  },
});
