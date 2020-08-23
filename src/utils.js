export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const addZero = (num) => num > 0 && num <= 9 ? `0` + num : num;
export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Рендерит элемент
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Рендерит шаблон
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Создает элемент из шаблона
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
