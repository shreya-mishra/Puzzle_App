import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Button_ from './Button_';
import {colors} from '../constants/Colors';
import Lottie from 'lottie-react-native';
import SoundView from './SoundView';

const {width} = Dimensions.get('screen');
type tankFrameType = {
  index: number;
  quantity: number;
  testID: string;
  quantityInMagicTank: number;
  emptyWaterHandler: () => void;
  addWaterHandler: () => NodeJS.Timer;
  setQuantityInTanks: React.Dispatch<React.SetStateAction<any[]>>;
  setQuantityInMagicTanks: React.Dispatch<React.SetStateAction<any[]>>;
};
const TankFrame = ({
  index,
  quantity,
  testID,
  emptyWaterHandler,
  quantityInMagicTank,
  addWaterHandler,
}: tankFrameType) => {
  const [tankLevelHeight] = useState(new Animated.Value(0));
  const [timer, setTimer] = useState<any>(null);
  const bufferText = useMemo(
    () => `Buffer: ${quantityInMagicTank.toFixed(0)}`,
    [quantityInMagicTank],
  );
  useEffect(() => {
    Animated.timing(tankLevelHeight, {
      toValue: quantity * 0.09,
      duration: 500,
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
          onPressIn={() => {
            setTimer(addWaterHandler);
          }}
          onPressOut={() => {
            clearInterval(timer);
          }}
        />
        <Button_
          title={'EMPTY '}
          handler={emptyWaterHandler}
          outLine={true}
          buttonColor={colors.color_secondary}
        />
      </View>
      <View style={styles.animationContainer}>
        <Text
          // numberOfLines={2}
          style={{
            color: 'black',
            textAlign: 'center',
            marginTop: 10,
            maxWidth: width,
          }}>
          {bufferText}
        </Text>
      </View>
      <View style={styles.animationContainer}>
        <Lottie
          loop={true}
          key={quantityInMagicTank.toString()}
          autoPlay={quantityInMagicTank ? true : false}
          source={require('../asset/raining_cloud.json')}
          style={{
            width: width / 5,
            height: 100,
          }}
        />
        <SoundView isPlaySound={quantityInMagicTank ? true : false} />
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
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    position: 'absolute',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: width / 5,
    bottom: 0,
  },
  tank: {
    height: 100,
    width: width / 5,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 8,
    borderColor: 'grey',
    display: 'flex',
    alignItems: 'flex-start',
    // overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
    flexDirection: 'column-reverse',
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
  animationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
