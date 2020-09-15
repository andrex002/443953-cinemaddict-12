import moment from 'moment';

const MINUTES_IN_HOUR = 60;

export const compareYear = (filmA, filmB) => filmB.yearOfProduction - filmA.yearOfProduction;

export const compareRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const formatDurationInMinutes = (duration) => {
  const hours = moment.duration(duration, `minutes`).hours();
  const minutes = moment.duration(duration, `minutes`).minutes();
  return duration > MINUTES_IN_HOUR ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatDateOfRelease = (date) => moment(date).format(`DD MMMM YYYY`);
export const formatCommentDate = (date) => moment(date).format(`YYYY/MM/DD HH:mm`);
