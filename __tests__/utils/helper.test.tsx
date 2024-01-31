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

describe('delay', () => {
  it('should delay the specified time', async () => {
    const start = Date.now();
    await delay(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});

describe('addWaterHandler', () => {
  const setLiquidQuanityMock = jest.fn();
  const setIntervalIdMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add water to the specified tank', () => {
    const index = 2;
    const prevLevels = [100, 150, 200, 250];
    setLiquidQuanityMock.mockImplementationOnce(prevLevels =>
      prevLevels.map((level, i) =>
        i === index && level < MaxQuantity
          ? Math.min(level + 200, MaxQuantity)
          : i === index - 1 && level > 0
          ? Math.max(level, 0)
          : level,
      ),
    );

    // Mock setInterval
    jest.useFakeTimers();

    addWaterHandler(index, setLiquidQuanityMock, setIntervalIdMock);

    // Fast-forward time by 1000 milliseconds
    jest.advanceTimersByTime(1000);

    // Ensure setLiquidQuanity is called with the expected arguments
    expect(setLiquidQuanityMock).toHaveBeenCalledWith(prevLevels);

    // Ensure setIntervalId is called once
    expect(setIntervalIdMock).toHaveBeenCalledTimes(1);

    // Clean up fake timers
    jest.useRealTimers();
  });

  it('should not exceed MaxQuantity when adding water', () => {
    const index = 1;
    const prevLevels = [300, 900, 500, 800];
    setLiquidQuanityMock.mockReturnValueOnce(prevLevels);

    addWaterHandler(index, setLiquidQuanityMock, setIntervalIdMock);

    // Ensure setLiquidQuanity is called with the expected arguments
    expect(setLiquidQuanityMock).toHaveBeenCalledWith((prevLevels: any) =>
      prevLevels.map((level: any, i: any) =>
        i === index && level < MaxQuantity
          ? Math.min(level + 200, MaxQuantity)
          : i === index - 1 && level > 0
          ? Math.max(level, 0)
          : level,
      ),
    );

    // Ensure setIntervalId is called once
    expect(setIntervalIdMock).toHaveBeenCalledTimes(1);
  });

  it('should stop pressing in when MaxQuantity is reached', () => {
    const index = 0;
    const prevLevels = [900, 200, 800, 700];
    setLiquidQuanityMock.mockReturnValueOnce(prevLevels);

    addWaterHandler(index, setLiquidQuanityMock, setIntervalIdMock);

    // Ensure setLiquidQuanity is called with the expected arguments
    expect(setLiquidQuanityMock).toHaveBeenCalledWith((prevLevels: any) =>
      prevLevels.map((level: any, i: any) =>
        i === index && level < MaxQuantity
          ? Math.min(level + 200, MaxQuantity)
          : i === index - 1 && level > 0
          ? Math.max(level, 0)
          : level,
      ),
    );

    // Ensure setIntervalId is called once
    expect(setIntervalIdMock).toHaveBeenCalledTimes(1);
  });
});
