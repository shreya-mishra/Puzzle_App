import {
  MaxQuantity,
  addWaterHandler,
  delay,
  getTotalWaterCanFlowOut,
} from '../../src/utils/helper';

describe('getTotalWaterCanFlowOut', () => {
  it('should return null if all tanks have liquid quantities close to the average', () => {
    const liquidQuantity = [100, 100, 100, 100];
    const averageQty = 100;
    const smallerQtyTanks = [1, 2];
    const result = getTotalWaterCanFlowOut(
      liquidQuantity,
      averageQty,
      smallerQtyTanks,
    );
    expect(result).toBeNull();
  });

  it('should return null if liquid quantity array is empty', () => {
    const liquidQuantity = [];
    const averageQty = 100;
    const smallerQtyTanks = [1, 2];
    const result = getTotalWaterCanFlowOut(
      liquidQuantity,
      averageQty,
      smallerQtyTanks,
    );
    expect(result).toBeNull();
  });

  it('should calculate total flow rate and distribute water accordingly', () => {
    const liquidQuantity = [0, 0, 0, 1000];
    const averageQty = 250;
    const smallerQtyTanks = [0, 0, 0];
    const result = getTotalWaterCanFlowOut(
      liquidQuantity,
      averageQty,
      smallerQtyTanks,
    );
    expect(result).toEqual([
      8.333333333333334, 8.333333333333334, 8.333333333333334, 975,
    ]);
  });
});
