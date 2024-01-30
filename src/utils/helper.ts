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
