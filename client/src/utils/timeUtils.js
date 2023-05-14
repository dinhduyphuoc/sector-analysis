const convertISO8601ToMilliseconds = (iso8601, zone = 0) => {
  const milli = 60 * 60 * 1000;
  const time = new Date(iso8601).getTime() + zone * milli;
  return time;
};

export { convertISO8601ToMilliseconds };
