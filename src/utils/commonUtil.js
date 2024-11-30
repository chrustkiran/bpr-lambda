const sortRecord = (results, firstKey, secondKey=undefined) => {
    return results.sort((a, b) => {
      if (a[firstKey] < b[firstKey]) return -1;
      if (a[firstKey] > b[firstKey]) return 1;
      if (!secondKey) { return 0;} // If there is no second key, it will return 0
      if (a[secondKey] < b.lastname) return -1;
      if (a.lastname > b.lastname) return 1;
      return 0;
  });
  }

  module.exports = {sortRecord}