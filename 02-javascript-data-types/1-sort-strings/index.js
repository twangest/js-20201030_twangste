/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArray = arr.slice();
  return sortedArray.sort((a, b) => {
    const compareResult = a.localeCompare(b, 'ru', {caseFirst: 'upper'});
    switch (param) {
    case 'asc' :
      return compareResult;
    case 'desc':
      return -1 * compareResult;
    default:
      return 0;
    }
  });
}
