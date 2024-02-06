import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  NUMBER_OF_TANKS,
  addWaterHandler,
  emptyWaterHandler,
  ifArrayIsWithEqualValues,
} from './utils/helper';
import TankFrame from './components/TankFrame';
import {colors} from './constants/Colors';

const App = () => {
  const [quantityInTanks, setQuantityInTanks] = useState(
    Array(NUMBER_OF_TANKS).fill(0),
  );
  const [quantityInMagicTanks, setQuantityInMagicTanks] = useState(
    Array(NUMBER_OF_TANKS).fill(0),
  );

  useEffect(() => {
    let timer1 = setInterval(() => {
      console.log('Running');
      setQuantityInMagicTanks(prev1 => {
        if (!ifArrayIsWithEqualValues(prev1, 0)) {
          const totalInMagicTank = prev1.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          );
          const flow = Math.min(25, totalInMagicTank);
          const avgQty = flow / prev1.length;
          setQuantityInTanks(prev => {
            const waterInTanks = prev.map(
              val => val + Math.min(avgQty, 1000 - val),
            );
            return waterInTanks;
          });
          return prev1.map(val => {
            return val - (val / totalInMagicTank) * flow;
          });
        }
        return prev1;
      });
      setQuantityInTanks(prev => {
        const waterInTanks = [...prev];
        if (!ifArrayIsWithEqualValues(waterInTanks, waterInTanks[0])) {
          const totalWaterInTanks = waterInTanks.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          );
          const avgQtyInTank = totalWaterInTanks / waterInTanks.length;
          let tanksWithMoreWater = 0,
            tanksWitLessWater = 0;
          for (let i = 0; i < waterInTanks.length; i++) {
            if (waterInTanks[i] > avgQtyInTank) {
              tanksWithMoreWater++;
            } else if (waterInTanks[i] < avgQtyInTank) {
              tanksWitLessWater++;
            }
          }
          return waterInTanks.map(water => {
            if (water > avgQtyInTank) {
              return Math.max(avgQtyInTank, water - 25 / tanksWithMoreWater);
            } else if (water < avgQtyInTank) {
              return Math.min(avgQtyInTank, water + 25 / tanksWitLessWater);
            } else {
              return water;
            }
          });
        }
        return waterInTanks;
      });
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <ScrollView style={{...styles.container, padding: 16}}>
      <Text style={styles.title}>Water Tank Simulation</Text>
      <View style={styles.tankRow}>
        {quantityInTanks.map((quantity, index) => {
          return (
            <TankFrame
              key={index}
              addWaterHandler={() =>
                addWaterHandler(index, quantity, setQuantityInMagicTanks)
              }
              emptyWaterHandler={() => {
                emptyWaterHandler(
                  index,
                  setQuantityInTanks,
                  setQuantityInMagicTanks,
                );
              }}
              testID={`tank-${index}`}
              quantity={quantity}
              quantityInMagicTank={quantityInMagicTanks[index]}
              index={index}
              setQuantityInTanks={setQuantityInTanks}
              setQuantityInMagicTanks={setQuantityInMagicTanks}
            />
          );
        })}
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
  tankRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
