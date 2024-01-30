import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button_ from './Button_';

type tankFrameType = {
  index: number;
  quantity: number;
  testID: string;
  addWaterHandler: () => void;
  emptyWaterHandler: () => void;
};
const TankFrame = ({
  index,
  quantity,
  testID,
  addWaterHandler,
  emptyWaterHandler,
}: tankFrameType) => {
  const [tankLevelHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(tankLevelHeight, {
      toValue: quantity * 0.2,
      duration: 500, // Adjust the duration as needed
      easing: Easing.linear,
    }).start();
  }, [quantity]);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.buttonContainer}>
        <Button_
          title={'Add Water'}
          handler={addWaterHandler}
          buttonColor={'green'}
        />
        <Button_
          title={'Empty Water'}
          handler={emptyWaterHandler}
          buttonColor={'red'}
        />
      </View>
      {/* TODO: Add Water tank animation flow */}
      <View style={styles.tank}>
        <View style={styles.text}>
          <Text style={{color: '#313638'}}>{quantity.toFixed(1)}Ltr</Text>
        </View>
        <Animated.View style={[styles.tankLevel, {height: tankLevelHeight}]} />
      </View>
      <Text style={styles.basket}>Tank {index + 1}</Text>
    </View>
  );
};

export default TankFrame;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 100,
    margin: 20,
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: 100,
    transform: [{rotate: '180deg'}],
  },
  tank: {
    height: 250,
    width: 100,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'grey',
    display: 'flex',
    alignItems: 'flex-start',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
    transform: [{rotate: '180deg'}],
  },
  tankLevel: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3994f8',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  basket: {textAlign: 'center', marginTop: 8, color: 'orange'},
});
