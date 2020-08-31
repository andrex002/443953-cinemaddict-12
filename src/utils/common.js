export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const addZero = (num) => num > 0 && num <= 9 ? `0` + num : num;

export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

// Создает массив с рандомным количеством уникальных элементов из массива
export const getRandomListElements = (arr) => {
  let newList = [];
  const numberElements = getRandomInteger(1, arr.length - 1);
  for (let i = 0; i < numberElements; i++) {
    newList.push(getRandomElement(arr));
  }

  return Array.from(new Set(newList));
};