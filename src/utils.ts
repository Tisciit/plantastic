/**
 * Calculate a new date with a given offset of days
 * @param d The date to add days to
 * @param days The days to add
 */
export const dateAddDays = (d: Date, days: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

/**
 * Calculates the difference between two dates
 * @param d1 the first date
 * @param d2 the second date
 */
export const dateDiff = (d1: Date, d2: Date) => {
  const later = Math.max(d1.getTime(), d2.getTime());
  const earlier = Math.min(d1.getTime(), d2.getTime());
  const dif = later - earlier;
  return {
    seconds: Math.round(dif / 1000),
    minutes: Math.round(dif / 1000 / 60),
    hours: Math.round(dif / 1000 / 60 / 60),
    days: Math.round(dif / 1000 / 60 / 60 / 24),
    weeks: dif / 1000 / 60 / 60 / 24 / 7,
  };
};

//Compatibility Stuff
/**
 *
 * @deprecated
 */
export const getDateDifDays = (d1: Date, d2: Date) => {
  console.warn(
    "Function getDateDifDays is deprecated, consider switching to dateDiff().days"
  );
  return dateDiff(d1, d2).days;
};
