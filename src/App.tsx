import React, {useState} from 'react';
import {View} from 'react-native';

const App = () => {
  const [liquidQuantity, setLiquidQuanity] = useState<number>(0);

  const addButtonHandler = () => {
    setTimeout(() => {
      setLiquidQuanity((prev: number) => prev + 200);
    }, 1000);
  };

  const emptyButtonHandler = () => {
    setLiquidQuanity(0);
  };
  return (
    <View>
      <TankFrame addButtonHandler emptyButtonHandler liquidQuantity>
        <AddWaterButton />
        <EmptyWaterButton />
        <Tank />
      </TankFrame>

      <TankFrame addButtonHandler emptyButtonHandler liquidQuantity>
        <AddWaterButton />
        <EmptyWaterButton />
        <Tank />
      </TankFrame>

      <TankFrame addButtonHandler emptyButtonHandler liquidQuantity>
        <AddWaterButton />
        <EmptyWaterButton />
        <Tank />
      </TankFrame>
    </View>
  );
};

export default App;
