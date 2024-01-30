import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TankFrame from './components/TankFrame';
import {
  MaxQuantity,
  NUMBER_OF_TANKS,
  delay,
  getTotalWaterCanFlowOut,
} from './utils/helper';

const App = () => {
  const [liquidQuantity, setLiquidQuanity] = useState<number[]>(
    Array(NUMBER_OF_TANKS).fill(0),
  );

  useEffect(() => {
    // get total level
    const totalQty = liquidQuantity.reduce((acc, level) => acc + level, 0);

    // get average level
    const averageQty = totalQty / NUMBER_OF_TANKS;
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

  const addWaterHandler = (index: number) => {
    setLiquidQuanity(prevLevels =>
      prevLevels.map((level, i) =>
        i === index && level < MaxQuantity
          ? Math.min(level + 200, MaxQuantity)
          : i === index - 1 && level > 0
          ? Math.max(level - 200, 0)
          : level,
      ),
    );
  };

  const emptyWaterHandler = (index: number) => {
    setLiquidQuanity(prevLevels =>
      prevLevels.map((level, i) => (i === index ? 0 : level)),
    );
  };
  return (
    <View style={styles.tankRow}>
      {/* TODO: can add input box to ask enter number of tanks for now 3 tanks will be there*/}
      {liquidQuantity.map((level, index) => (
        <TankFrame
          testID="tank0"
          key={index}
          index={index}
          addWaterHandler={() => addWaterHandler(index)}
          emptyWaterHandler={() => emptyWaterHandler(index)}
          quantity={level}
        />
      ))}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  tankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tankContainer: {
    margin: 10,
    alignItems: 'center',
  },
});
