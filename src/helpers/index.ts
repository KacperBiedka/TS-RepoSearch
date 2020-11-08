import { sortByFieldType,
    filterFieldType,
    compareValuesType,
    getCacheValueType, 
    updateCacheValueType} from './types';

/**
 * Accepts the date in atom format and returns display string (DD-MM-YYYY)
 * @param {Date in atom format} date
 */
export const convertAtomDate = (date: Date | string) => {
    let convertedDate: Date = new Date(date);
    convertedDate.toISOString();
    let day: string | number = convertedDate.getUTCDate();
    let month: string | number = convertedDate.getUTCMonth() + 1;
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const year: string | number = convertedDate.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };
  
  /**
   * Accepts an array of objects and filters the array based on filter and order
   * Supports nested object values of type: String, Number and Date
   * @param {Aray of Objects} array
   * @param {String} field
   * @param {String} order
   */
  export const sortByField: sortByFieldType = (array, field, order) => {
    let multiplier : number;
    if (order === "desc") {
      multiplier = 1;
    } else {
      multiplier = -1;
    }
    const compareValues: compareValuesType = (a, b) => {
      let val1: filterFieldType = a[field];
      let val2: filterFieldType = b[field];
      if (typeof val1 === "string" && typeof val2 === "string") {
        val1 = val1.toLowerCase();
        val2 = val2.toLowerCase();
      } else if (val1 instanceof Date && val2 instanceof Date) {
        val1 = val1.getTime();
        val2 = val2.getTime();
      }
      if (val1 < val2) {
        return -1 * multiplier;
      } else if (val1 > val2) {
        return 1 * multiplier;
      }
      return 0;
    };
    return array.sort(compareValues);
  };
  
  /**
   * Small helper function for retrieving the values from local storage
   * checks if the value is present, parses it and passes it as an arugment in a callback function
   * @param {String} name
   * @param {Function} callback
   */
  export const getCacheValue: getCacheValueType = (name, callback) => {
    const cacheField = localStorage.getItem(name);
    if (cacheField) {
      const parsedValue = JSON.parse(cacheField);
      callback(parsedValue);
    }
  };
  
  /**
   * Small helper function for updating the values in the cache
   * assigns converted value at a cache field specified in the name property
   * @param {string} name
   * @param {*} value
   */
  export const updateCacheValue: updateCacheValueType = (name, value) => {
    const cacheValue = JSON.stringify(value);
    localStorage.setItem(name, cacheValue);
  };
  