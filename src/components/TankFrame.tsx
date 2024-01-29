import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button_ from './Button_';

type tankFrameType = {
  quantity: number;
  addWaterHandler: () => void;
  emptyWaterHandler: () => void;
};
const TankFrame = ({
  quantity,
  addWaterHandler,
  emptyWaterHandler,
}: tankFrameType) => {
  return (
    <View style={styles.container}>
      <Button_ title={'Add Water'} handler={addWaterHandler} />
      <Button_ title={'Empty Water'} handler={emptyWaterHandler} />

      <Text>Basket : {quantity}L</Text>
    </View>
  );
};

export default TankFrame;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
