export const isObjectEmpty = (object) =>
  Object.values(object).some((el) => el !== "");
