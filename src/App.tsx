import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import TankFrame from './components/TankFrame';
import {
  MaxQuantity,
  NUMBER_OF_TANKS,
  delay,
  getTotalWaterCanFlowOut,
} from './utils/helper';

const App = () => {
  const [numTanks, setNumTanks] = useState<number>(NUMBER_OF_TANKS); // Default number of tanks

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
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter number of tanks"
        placeholderTextColor={'#313638'}
        keyboardType="numeric"
        onChangeText={text => setNumTanks(parseInt(text) || 0)}
      />
      <View style={styles.tankRow}>
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
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#efefef',
  },
  input: {
    height: 40,
    // borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    margin: 10,
    borderRadius: 4,
  },
  tankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //width: 100,
  },
});
