export const convertISO8601ToMilliseconds = (iso8601: string, zone = 0) => {
  const milli = 60 * 60 * 1000;
  const time = new Date(iso8601).getTime() + zone * milli;
  return time;
};

export const roundNum = (number: number, precision = 2) => {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
};
