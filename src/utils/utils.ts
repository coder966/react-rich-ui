/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const range = (from: number, to: number) => {
  return rangeOfSize(to - from + 1, from);
};

const rangeOfSize = (size: number, startAt: number = 0) => {
  return Array.from({ length: size }, (x, i) => i + startAt);
};

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
const retainAll = <T1, T2>(firstArray: T1[], secondArray: T2[], comparator: (obj1: T1, obj2: T2) => boolean) => {
  return firstArray.filter((obj1: T1) => {
    const searchResult = secondArray.find((obj2: T2) => comparator(obj1, obj2));
    // don't simplify to return searchResult because searchResult could be 0 (number) which is falsy
    return searchResult !== undefined;
  });
};

const isObjKey = <T extends object>(obj: T, key: any): key is keyof T => {
  if (typeof obj === 'object') {
    return key in obj;
  }
  return false;
};

const resolveObjectAttribute = (path: string, obj: object): any => {
  return path
    .split('.')
    .reduce((prev: object | null, curr: string) => (prev && isObjKey(prev, curr) ? prev[curr] : null), obj);
};

const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;

  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export { deepEqual, isObjKey, range, rangeOfSize, resolveObjectAttribute, retainAll };
