/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (typeof arr === 'undefined') {
    return [];
  }
  // короткая запись
  return [...(new Set([...arr]))];

}
