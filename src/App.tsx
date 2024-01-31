import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import TankFrame from './components/TankFrame';
import {
  MaxQuantity,
  NUMBER_OF_TANKS,
  delay,
  getTotalWaterCanFlowOut,
} from './utils/helper';
import {colors} from './constants/Colors';

const App = () => {
  const [numTanks] = useState<number>(NUMBER_OF_TANKS); // Default number of tanks

  const [liquidQuantity, setLiquidQuanity] = useState<number[]>(
    Array(numTanks).fill(0),
  );
  useEffect(() => {
    const newTanks = Array(numTanks).fill(0);
    setLiquidQuanity(newTanks);
  }, [numTanks]);
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
  const [intervalId, setIntervalId] = useState(null);
  const addWaterHandler = (index: number) => {
    const id = setInterval(() => {
      setLiquidQuanity(prevLevels =>
        prevLevels.map((level, i) =>
          i === index && level < MaxQuantity
            ? Math.min(level + 200, MaxQuantity)
            : i === index - 1 && level > 0
            ? Math.max(level, 0)
            : level,
        ),
      );
    }, 1000);
    setIntervalId(id);
  };
  const stopPressingIn = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const emptyWaterHandler = (index: number) => {
    setLiquidQuanity(prevLevels =>
      prevLevels.map((level, i) => (i === index ? 0 : level)),
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Water Tank Simulation</Text>
      <View style={styles.tankRow}>
        {liquidQuantity.map((level, index) => (
          <TankFrame
            testID="tank0"
            key={index}
            index={index}
            addWaterHandler={() => addWaterHandler(index)}
            clearInterval={stopPressingIn}
            emptyWaterHandler={() => emptyWaterHandler(index)}
            quantity={level}
          />
        ))}
      </View>
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
    flexDirection: 'row',
    gap: 10,
    padding: 20,
    flexWrap: 'wrap',
  },
});
