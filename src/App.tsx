import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import TankFrame from './components/TankFrame';
import {
  MaxQuantity,
  NUMBER_OF_TANKS,
  addWaterHandler,
  delay,
  emptyWaterHandler,
  getTotalWaterCanFlowOut,
  stopPressingIn,
  emptyWaterHandlerNew,
  addWaterHandlerNew,
  balanceAllWaterTanks,
} from './utils/helper';
import {colors} from './constants/Colors';
import TankFrameNew from './components/TankFrameNew';

export type TanksType = {
  bufferWaterTankQuantity: number;
  waterTankQuantity: number;
  id: number;
};
const App = () => {
  const [waterTanks, setWaterTanks] = useState<TanksType[]>(
    Array(NUMBER_OF_TANKS)
      .fill(1)
      .map((tank, index) => ({
        bufferWaterTankQuantity: 0,
        waterTankQuantity: 0,
        id: index + 1,
      })),
  );
  
  let addWaterInterval = useRef<any>(null);
  let emptyWaterFromBufferToWaterTankInterval = useRef<any>(null);

  const [numTanks] = useState<number>(NUMBER_OF_TANKS); // Default number of tanks

  const [liquidQuantity, setLiquidQuanity] = useState<number[]>(
    Array(numTanks).fill(0),
  );

  const [magicalBuffer, setMagicalBuffer] = useState<number[]>(
    Array(numTanks).fill(0),
  );
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const newTanks = Array(numTanks).fill(0);
    setLiquidQuanity(newTanks);
  }, [numTanks]);

  useEffect(() => {
    console.log(
      'balanceAllWaterTanks(waterTanks)',
      balanceAllWaterTanks(waterTanks),
    );

    setWaterTanks(prev => balanceAllWaterTanks(prev));
  }, [waterTanks]);

  useEffect(() => {
    // get total level
    const totalQty = liquidQuantity.reduce((acc, level) => acc + level, 0);

    // get average level
    const averageQty = totalQty / numTanks;
    // get smaller tank quantity
    const smallerQtyTanks = liquidQuantity.filter(level => level < averageQty);
    //get total water that can flow out
    let cleanup = false;

    async function balanceLevels() {
      await delay(1000);

      if (cleanup) {
        return;
      }

      const newTanks = getTotalWaterCanFlowOut(
        liquidQuantity,
        averageQty,
        smallerQtyTanks,
      );
      if (newTanks) {
        setLiquidQuanity(newTanks);
      }
    }

    balanceLevels();
    return () => {
      cleanup = true;
    };
    //get total water that can flow out and distribute into small tank
  }, [liquidQuantity]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Water Tank Simulation</Text>
      <View style={styles.tankRow}>
        {waterTanks.map(tank => (
          <TankFrameNew
            testID={`tank${tank.id - 1}`}
            key={tank.id}
            addWaterHandler={() => {
              addWaterHandlerNew(tank.id, addWaterInterval, setWaterTanks);
            }}
            waterTank={tank}
            clearInterval={() =>
              addWaterInterval && clearInterval(addWaterInterval.current)
            }
            emptyWaterHandler={() =>
              emptyWaterHandlerNew(tank.id, setWaterTanks)
            }
          />
        ))}
      </View>
      {/* <View style={styles.tankRow}>
        {liquidQuantity.map((level, index) => (
          <TankFrame
            testID={`tank${index}`}
            key={index}
            index={index}
            addWaterHandler={() =>
              addWaterHandler(
                index,
                setLiquidQuanity,
                setIntervalId,
                setMagicalBuffer,
              )
            }
            magicalBuffer={magicalBuffer[index]}
            clearInterval={() => stopPressingIn(intervalId, setIntervalId)}
            emptyWaterHandler={() => emptyWaterHandler(index, setLiquidQuanity)}
            quantity={level}
          />
        ))}
      </View> */}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.color_water,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    margin: 10,
    borderRadius: 4,
  },
  tankRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
