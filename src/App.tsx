import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TankFrame from './components/TankFrame';

const NUMBER_OF_TANKS = 3;
const MaxQuantity = 1000;

const App = () => {
  const [liquidQuantity, setLiquidQuanity] = useState<number[]>(
    Array(NUMBER_OF_TANKS).fill(0),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const flowRate = 25;
      console.log('liquidQuantity', liquidQuantity);

      // Calculate the average water level
      const averageLevel =
        liquidQuantity.reduce((sum, level) => sum + level, 0) / NUMBER_OF_TANKS;

      // Simulate water flow between tanks
      const updatedLevels = liquidQuantity.map((level, i) => {
        const nextLevel =
          i < liquidQuantity.length - 1
            ? liquidQuantity[i + 1]
            : liquidQuantity[0];

        if (level > nextLevel) {
          return level - flowRate;
        } else if (level < averageLevel) {
          return level + flowRate;
        } else {
          return level;
        }
      });

      setLiquidQuanity(updatedLevels);
    }, 1000);

    return () => clearInterval(interval);
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
