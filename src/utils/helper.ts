import {TanksType} from '../App';

export const NUMBER_OF_TANKS = 2;
export const MaxQuantity = 1000;
export const flowRate = 25;
export const getTotalWaterCanFlowOut = (
  liquidQuantity: number[],
  averageQty: number,
  smallerQtyTanks: [],
) => {
  if (liquidQuantity.every(qty => qty - averageQty < 0.0001)) {
    return null;
  }

  if (liquidQuantity.length === 0) {
    return null;
  }

  let totalFlowRate = 0;
  const newQtyInTanks = liquidQuantity.map(qty => {
    if (qty > averageQty) {
      const outFlowRate = Math.min(qty - averageQty, flowRate);
      totalFlowRate = totalFlowRate + outFlowRate;
      return qty - outFlowRate;
    }
    return qty;
  });

  const waterDistribution = totalFlowRate / smallerQtyTanks.length;

  newQtyInTanks.forEach((qty, index) => {
    if (qty < averageQty) {
      newQtyInTanks[index] = qty + waterDistribution;
    }
  });

  return newQtyInTanks;
};

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// We have a magical system of connected water tanks. Each tank can hold 1000L of water.

// Every tank has an "Add water" button, if the button is pressed down continuously, then every 1s, it adds 200L of water in the tank, if the tank is not already full.

// The water levels in each tank will eventually settle to the same height. The water moves in or out of any tank at the rate of 25L/second

// Every tank also has a "Empty tank" button. When clicked, it will remove all the water from the tank in an instant

const updateWaterBufferTankQuantity = (
  tank: TanksType,
  tankId: number,
): TanksType => {
  if (tank.id === tankId && tank.waterTankQuantity < MaxQuantity) {
    return {
      bufferWaterTankQuantity: Math.min(
        tank.bufferWaterTankQuantity + 200,
        MaxQuantity,
      ),
      waterTankQuantity: tank.waterTankQuantity,
      id: tank.id,
    };
  }
  return {
    bufferWaterTankQuantity: tank.bufferWaterTankQuantity,
    waterTankQuantity: tank.waterTankQuantity,
    id: tank.id,
  };
};

const updateWaterTankQuantity = (
  tank: TanksType,
  tankId: number,
): TanksType => {
  if (tank.id === tankId && tank.waterTankQuantity < MaxQuantity) {
    return {
      bufferWaterTankQuantity: Math.min(
        tank.bufferWaterTankQuantity - 25,
        MaxQuantity,
      ),
      waterTankQuantity: Math.min(tank.waterTankQuantity + 25, MaxQuantity),
      id: tank.id,
    };
  }
  return {
    bufferWaterTankQuantity: tank.bufferWaterTankQuantity,
    waterTankQuantity: tank.waterTankQuantity,
    id: tank.id,
  };
};

export const addWaterHandlerNew = (
  tankId: number,
  addWaterInterval: React.MutableRefObject<any>,
  setWaterTanks: React.Dispatch<React.SetStateAction<TanksType[]>>,
) => {
  addWaterInterval.current = setInterval(() => {
    setWaterTanks(prev =>
      prev.map(tank => updateWaterBufferTankQuantity(tank, tankId)),
    );
    setTimeout(() => {
      setWaterTanks(prev =>
        prev.map(tank => updateWaterTankQuantity(tank, tankId)),
      );
    }, 1000);
  }, 1000);
};

export const addWaterHandler = (
  index: number,
  setLiquidQuanity: (prev: any) => void,
  setIntervalId: (prev: any) => void,
  setMagicalBuffer: (prev: any) => void,
) => {
  const id = setInterval(() => {
    // setMagicalBuffer((prevWaterBufferLevel: number[]) =>
    //   prevWaterBufferLevel.map((waterLevel: number, i: number) =>
    //     i === index && waterLevel < MaxQuantity
    //       ? Math.min(waterLevel + 200, MaxQuantity)
    //       : waterLevel,
    //   ),
    // );
    // setTimeout(() => {
    setLiquidQuanity((prevWaterLevels: any) =>
      prevWaterLevels.map((waterLevel: any, i: any) =>
        i === index && waterLevel < MaxQuantity
          ? Math.min(waterLevel + 25, MaxQuantity)
          : i === index - 1 && waterLevel > 0
          ? Math.max(waterLevel, 0)
          : waterLevel,
      ),
    );
    // setMagicalBuffer([0]);
    // console.log('SDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    // setMagicalBuffer((prev: any) =>
    //   prev.map((waterLevel: number, i: number) =>
    //     i === index && waterLevel < MaxQuantity
    //       ? Math.min(waterLevel - 25, MaxQuantity)
    //       : waterLevel,
    //   ),
    // );
    // setMagicalBuffer((prevWaterBufferLevel: number[]) =>
    //   prevWaterBufferLevel.map((waterLevel: number, i: number) =>
    //     i === index && waterLevel < MaxQuantity
    //       ? Math.min(waterLevel - 25, MaxQuantity)
    //       : waterLevel || 0,
    //   ),
    // );
    // }, 1000);
  }, 1000);
  setIntervalId(id);
};
export const stopPressingIn = (
  intervalId: any,
  setIntervalId: (prev: any) => void,
) => {
  clearInterval(intervalId);
  setIntervalId(null);
};

export const emptyWaterHandler = (
  index: number,
  setLiquidQuanity: (prev: any) => void,
) => {
  setLiquidQuanity((prevLevels: any) =>
    prevLevels.map((level: any, i: any) => (i === index ? 0 : level)),
  );
};

export const emptyWaterHandlerNew = (
  id: number,
  setWaterQuanity: React.Dispatch<React.SetStateAction<TanksType[]>>,
) => {
  setWaterQuanity(prevTank =>
    prevTank.map((tank, i) =>
      i === id
        ? {
            bufferWaterTankQuantity: tank.bufferWaterTankQuantity,
            id: id,
            waterTankQuantity: 0,
          }
        : tank,
    ),
  );
};

export const balanceAllWaterTanks = (waterTanks: TanksType[]): TanksType[] => {
  // Calculate the total waterTankQuantity
  const totalWaterQuantity = waterTanks.reduce(
    (sum, tank) => sum + tank.waterTankQuantity,
    0,
  );

  // Calculate the average value
  const averageWaterQuantity = totalWaterQuantity / waterTanks.length;

  // Map over the array and update the waterTankQuantity property
  const updatedTanks = waterTanks.map(tank => ({
    ...tank,
    waterTankQuantity: averageWaterQuantity,
  }));

  return updatedTanks;
};
