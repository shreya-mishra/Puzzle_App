export const NUMBER_OF_TANKS = 4;
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

export const addWaterHandler = (
  index: number,
  setLiquidQuanity: (prev: any) => void,
  setIntervalId: (prev: any) => void,
) => {
  const id = setInterval(() => {
    setLiquidQuanity((prevLevels: any) =>
      prevLevels.map((level: any, i: any) =>
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
