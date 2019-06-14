
let notEven = number => number % 2 !== 0; 

let countFilter = (array, val) => {
  return array.filter( data => data === val ).length;
}

/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your solution should go here.

  // clean pile unique colors
  const cleanColors = new Set(cleanPile);

  cleanColors.forEach(color => {
 
      const pileNotEven = notEven(countFilter(cleanPile, color));

      if (noOfWashes > 0 && pileNotEven && dirtyPile.includes(color)) {
        const pile_one = dirtyPile.slice(0, dirtyPile.indexOf(color));
        const pile_two = dirtyPile.slice(dirtyPile.indexOf(color) + 1, dirtyPile.length);

        dirtyPile = [...pile_one, ...pile_two]
        
        cleanPile.push(color);

        --noOfWashes;
      }
  })

  // pairs in clean pile
  let pairs = 0;

  cleanColors.forEach(color => {
      pairs += Math.floor(countFilter(cleanPile, color) / 2)
  })

  // get remaining pairs in dirty pile
  if (noOfWashes < 2) {
    const getDirtyColor = new Set(dirtyPile);
   
    getDirtyColor.forEach(color => {
      if (noOfWashes < 2) {
        return;
      }

      const noOfDirtypiles = countFilter(dirtyPile, color);
      const allowedCapacity = (noOfWashes < noOfDirtypiles ? noOfWashes : noOfDirtypiles) / 2;

      let colorPairs = Math.floor(allowedCapacity);
      pairs += colorPairs;

      noOfWashes -= colorPairs * 2;
    })
  }

  return pairs;
  // console.log(pairs);
}
// const noOfWashes = 4;
// const cleanPile = [1, 2, 1, 1];
// const dirtyPile = [1, 4, 3, 2, 4];


module.exports = getMaxPairs;
// getMaxPairs(noOfWashes, cleanPile, dirtyPile);
