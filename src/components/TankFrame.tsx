import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button_ from './Button_';

type tankFrameType = {
  index: number;
  quantity: number;
  addWaterHandler: () => void;
  emptyWaterHandler: () => void;
};
const TankFrame = ({
  index,
  quantity,
  addWaterHandler,
  emptyWaterHandler,
}: tankFrameType) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button_ title={'Add Water'} handler={addWaterHandler} />
        <Button_ title={'Empty Water'} handler={emptyWaterHandler} />
      </View>

      <Text style={styles.basket}>
        Water Level in Tank {index + 1}: {quantity}L
      </Text>
    </View>
  );
};

export default TankFrame;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 100,
    height: 100,
    margin: 40,
    // marginTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  basket: {textAlign: 'center', marginTop: 8, color: 'orange'},
});
