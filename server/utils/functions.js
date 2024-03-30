export const createOfficialId = (type) => {
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const date = new Date();
  const currentYear = date.getFullYear();
  const lastTwoDigits = currentYear % 100;
  return lastTwoDigits + type + genRanHex(8);
};
