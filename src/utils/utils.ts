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

/**
 * @param path supports dot-notation for object keys and bracket-notation for arrays
 * @param obj
 */
const resolveObjectAttribute = (path: string, obj: object): any => {
  if (obj == null) return undefined;

  // Split into tokens: parts between dots or inside brackets
  const tokens: (string | number)[] = [];

  const re = /([^.\[\]]+)|\[(\d+)\]/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(path)) !== null) {
    if (m[1] !== undefined) {
      // dot notation key
      tokens.push(m[1]);
    } else if (m[2] !== undefined) {
      // numeric index
      tokens.push(Number(m[2]));
    }
  }

  let cur: any = obj;

  for (const key of tokens) {
    if (cur == null) return undefined;
    cur = cur[key as any];
  }

  return cur;
}

const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;

  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export { deepEqual, range, rangeOfSize, resolveObjectAttribute, retainAll };
