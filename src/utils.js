export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const addZero = (num) => {
  if (num > 0 && num <= 9) {
    return `0` + num;
  } else {
    return num;
  }
};
