/**
 * Laundry Problem
 *
 * @param {number} noOfWashes
 * @param {number[]} cleanPile
 * @param {number[]} dirtyPile
 *
 * @returns {number}
 */

 function getMaxPair(noOfWashes, cleanPile, dirtyPile) {
  let maxPair = 0;
  let singlePile = [];

  // select the pairs in clean pile, and move unmatched socks into single pile
  while (cleanPile.sort().length > 0) {
    if (cleanPile.filter(x => x === cleanPile[0]).length > 1) {
      maxPair++;
      cleanPile.splice(0, 2);
    } else {
      singlePile.push(cleanPile[0]);
      cleanPile.splice(0, 1);
    }
  }

  // match remaining single socks from clean pile with socks in dirty pile, and wash as many as possible
  if (singlePile.length > 0) {
    for (let i=0; i<singlePile.length; i++) {
      if (noOfWashes>0 && dirtyPile.includes(singlePile[i])) {
        maxPair++;
        dirtyPile.splice(dirtyPile.indexOf(singlePile[i]), 1);
        noOfWashes--;
      }
    }
  }

  // select the remaining pairs in dirty pile, considering the no. of washes left
  while (dirtyPile.sort().length > 0) {
    if (noOfWashes>0 && (dirtyPile.filter(x => x === dirtyPile[0]).length > 1)) {
      dirtyPile.splice(0, 2);
      if (noOfWashes - 2 >= 0) maxPair++;
      noOfWashes -= 2;
    } else {
      dirtyPile.splice(0, 1);
    }
  }

  return maxPair;
}

module.exports = getMaxPair;
