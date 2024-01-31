import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button_ from './Button_';
import {colors} from '../constants/Colors';

const {width} = Dimensions.get('screen');
type tankFrameType = {
  index: number;
  quantity: number;
  testID: string;
  addWaterHandler: () => void;
  emptyWaterHandler: () => void;
  clearInterval: () => void;
};
const TankFrame = ({
  index,
  quantity,
  testID,
  addWaterHandler,
  emptyWaterHandler,
  clearInterval,
}: tankFrameType) => {
  const [tankLevelHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(tankLevelHeight, {
      toValue: quantity * 0.08,
      duration: 500, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [quantity]);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.buttonContainer}>
        <Button_
          title={'ADD '}
          buttonColor={'green'}
          outLine={false}
          onPressIn={addWaterHandler}
          onPressOut={clearInterval}
        />
        <Button_
          title={'EMPTY '}
          handler={emptyWaterHandler}
          outLine={true}
          buttonColor={colors.color_secondary}
        />
      </View>
      <View style={styles.tank}>
        <Animated.View style={[styles.tankLevel, {height: tankLevelHeight}]} />
        <View style={styles.text}>
          <Text style={{color: quantity > 700 ? 'white' : colors.color_100}}>
            {quantity.toFixed(1)}Ltr
          </Text>
        </View>
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
    width: width / 5,
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: width / 5,
    transform: [{rotate: '180deg'}],
  },
  tank: {
    height: 100,
    width: width / 5,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 8,
    // borderTopRightRadius: 8,
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
    backgroundColor: colors.color_water,
    borderWidth: 1,
    borderColor: colors.color_background,
    borderRadius: 8,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  basket: {
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
    color: 'orange',
  },
});
