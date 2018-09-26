/* eslint no-underscore-dangle: off */
const filterQuery = (arr, str) => {
  if (arr) {
    const isAMatch = (obj) => (obj.__typename === str ? obj : null);
    return arr.find((obj) => isAMatch(obj));
  }
  return null;
};

export default filterQuery;
