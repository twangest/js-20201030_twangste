/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size === 'undefined') {
    return string;
  }
  if (size === 0) {
    return '';
  }

  const strArray = Array.from(string);
  let buffer = [];

  // Решение с использованием array.reduce
  return strArray.reduce((accumulator, currentValue) => {
    if (buffer.length < size) {
      if (!buffer.includes(currentValue)) {
        buffer = [];
      }
      buffer.push(currentValue);
      accumulator += currentValue;
    } else {
      if (!buffer.includes(currentValue)) {
        buffer = [currentValue];
        accumulator += currentValue;
      }
    }
    return accumulator;
  }, '');

  // Такое же решение с использование цикла while...

  // let result = '';
  // while (strArray.length) {
  //   const letter = strArray.shift();
  //   if (buffer.length < size) {
  //     if (!buffer.includes(letter)) {
  //       buffer = [];
  //     }
  //     buffer.push(letter);
  //     result += letter;
  //   } else if (!buffer.includes(letter)) {
  //     buffer = [letter];
  //     result += letter;
  //   }
  // }
  // return result;
}
