import React, {useState} from 'react';
import {View} from 'react-native';
import TankFrame from './components/TankFrame';

const App = () => {
  const [liquidQuantity, setLiquidQuanity] = useState<number>(0);

  const addWaterHandler = () => {
    setTimeout(() => {
      setLiquidQuanity((prev: number) => prev + 200);
    }, 1000);
  };

  const emptyWaterHandler = () => {
    setLiquidQuanity(0);
  };
  return (
    <View>
      {/* TODO: can add input box to ask enter number of tanks for now 3 tanks will be there*/}
      <TankFrame
        addWaterHandler={addWaterHandler}
        emptyWaterHandler={emptyWaterHandler}
        quantity={liquidQuantity}
      />
    </View>
  );
};

export default App;
