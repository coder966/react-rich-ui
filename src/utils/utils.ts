const range = (from: number, to: number) => {
  return rangeOfSize(to-from+1, from);
}

const rangeOfSize = (size: number, startAt: number = 0) => {
  return Array.from({ length: size }, (x, i) => i + startAt);
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
  isObjKey,
  resolveObjectAttribute,
  isValidDateObject,
  addOrSubtractDays,
};

