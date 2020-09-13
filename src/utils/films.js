import moment from 'moment';

export const compareYear = (filmA, filmB) => filmB.yearOfProduction - filmA.yearOfProduction;

export const compareRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const formatDurationInMinutes = (duration) => {
  const hours = moment.duration(duration, `minutes`).hours();
  const minutes = moment.duration(duration, `minutes`).minutes();
  return `${hours}h ${minutes}m`;
};

export const formatDateOfRelease = (date) => moment(date).format(`DD MMMM YYYY`);
export const formatCommentDate = (date) => moment(date).format(`YYYY/MM/DD HH:mm`);
