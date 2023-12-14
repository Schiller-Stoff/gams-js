/**
 * Uses JSON.parse and JSON.stringify to generate 
 * a deep copy of given value.
 * @param {Object | Array<any>} value Object or Array to copy deep.
 * @returns {Object | Array<any>} deep copy of given Object or Array.
 */
const copyDeep = (value: Object | Array<any>) => {
  return JSON.parse(JSON.stringify(value));
}

export const generalUtils = {
  copyDeep
}

