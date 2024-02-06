export const NUMBER_OF_TANKS = 4;
export const MaxQuantity = 1000;
export const flowRate = 25;

export const addWaterHandler = (
  index: number,
  quantity: number,
  setQuantityInMagicTanks: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  const timer_ = setInterval(() => {
    setQuantityInMagicTanks(prev => {
      const newQuantityInMagicTanks = [...prev];
      newQuantityInMagicTanks[index] =
        1000 - (newQuantityInMagicTanks[index] + quantity) > 200
          ? newQuantityInMagicTanks[index] + 200
          : newQuantityInMagicTanks[index] +
            (1000 - (newQuantityInMagicTanks[index] + quantity));
      return newQuantityInMagicTanks;
    });
  }, 1000);
  return timer_;
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
  setLiquidQuanity: React.Dispatch<React.SetStateAction<any[]>>,
  setQuantityInMagicTanks: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setQuantityInMagicTanks((prevLevels: any) => {
    const newQuantityInTanks = [...prevLevels];
    newQuantityInTanks[index] = 0;
    return newQuantityInTanks;
  });
  setLiquidQuanity((prevLevels: any) => {
    const newQuantityInTanks = [...prevLevels];
    newQuantityInTanks[index] = 0;
    return newQuantityInTanks;
  });
};

export const ifArrayIsWithEqualValues = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== value) {
      return false;
    }
  }
  return true;
};
