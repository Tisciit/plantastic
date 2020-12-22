export const dateAddDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

export const getDateDifDays = (d1: Date, d2: Date) => {
  const later = Math.max(d1.getTime(), d2.getTime());
  const earlier = Math.min(d1.getTime(), d2.getTime());
  const dif = later - earlier;
  return Math.round(dif / 1000 / 60 / 60 / 24);
};
