export const createStatisticsTemplate = (films) => {
  const filmsAmount = films ? films.length : 0;

  return (
    `<p>${filmsAmount} movies inside</p>`
  );
};
