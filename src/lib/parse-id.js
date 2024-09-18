export const parseId = (str) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};
