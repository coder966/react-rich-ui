const range = (from: number, to: number) => {
  return rangeOfSize(to - from + 1, from);
}

const rangeOfSize = (size: number, startAt: number = 0) => {
  return Array.from({ length: size }, (x, i) => i + startAt);
}

/**
 * Retains only the elements in the first array that are contained in the second array.
 * In other words, removes from the first array all of its elements that are not contained in the second array.
 * This method does not mutate its input arrays.
 * 
 * @param firstArray 
 * @param secondArray
 * @param comparator
 * @returns 
 */
const retainAll = <T1, T2>(firstArray: T1[], secondArray: T2[], comparator: ((obj1: T1, obj2: T2) => boolean)) => {
  return firstArray.filter((obj1: T1) => {
    const searchResult = secondArray.find((obj2: T2) => comparator(obj1, obj2));
    // don't simplify to return searchResult because searchResult could be 0 (number) which is falsy
    return searchResult !== undefined;
  });
}

const isObjKey = <T extends object>(obj: T, key: any): key is keyof T => {
  return key in obj;
};

const resolveObjectAttribute = (path: string, obj: object): any => {
  return path
    .split('.')
    .reduce((prev: object | null, curr: string) => (prev && isObjKey(prev, curr) ? prev[curr] : null), obj);
};

const isValidDateObject = (date: any): boolean => {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

const addOrSubtractDays = (startingDate: Date, days: number): Date => {
  const dateCopy = new Date(startingDate.getTime());
  dateCopy.setDate(dateCopy.getDate() + days);
  return dateCopy;
}

export {
  range,
  rangeOfSize,
  retainAll,
  isObjKey,
  resolveObjectAttribute,
  isValidDateObject,
  addOrSubtractDays,
};

