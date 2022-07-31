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

import usePagination from './usePagination';

describe('usePagination', () => {
  test('base=0: 0 pages', () => {
    const expected: string[] = [];
    const pagination = usePagination(0, 0, 0);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: 1 page', () => {
    const expected = ['*0'];
    const pagination = usePagination(0, 1, 1);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: 2 pages', () => {
    const expected = ['*0', '1'];
    const pagination = usePagination(0, 2, 0);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: 3 pages', () => {
    const expected = ['*0', '1', '2'];
    const pagination = usePagination(0, 3, 0);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: 4 pages', () => {
    const expected = ['*0', '1', '2', '3'];
    const pagination = usePagination(0, 4, 0);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: N pages, active is in the first block', () => {
    const expected = ['0', '1', '*2', '3', '...', '10', '11'];
    const pagination = usePagination(0, 12, 2);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: N pages, active is in the middle block', () => {
    const expected = ['0', '1', '...', '3', '*4', '5', '...', '10', '11'];
    const pagination = usePagination(0, 12, 4);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=0: N pages, active is in the last block', () => {
    const expected = ['0', '1', '...', '8', '*9', '10', '11'];
    const pagination = usePagination(0, 12, 9);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  // ==================================================================================

  test('base=1: 0 pages', () => {
    const expected: string[] = [];
    const pagination = usePagination(1, 0, 0);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: 1 page', () => {
    const expected = ['*1'];
    const pagination = usePagination(1, 1, 1);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: 2 pages', () => {
    const expected = ['*1', '2'];
    const pagination = usePagination(1, 2, 1);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: 3 pages', () => {
    const expected = ['*1', '2', '3'];
    const pagination = usePagination(1, 3, 1);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: 4 pages', () => {
    const expected = ['*1', '2', '3', '4'];
    const pagination = usePagination(1, 4, 1);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: N pages, active is in the first block', () => {
    const expected = ['1', '2', '*3', '4', '...', '11', '12'];
    const pagination = usePagination(1, 12, 3);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: N pages, active is in the middle block', () => {
    const expected = ['1', '2', '...', '4', '*5', '6', '...', '11', '12'];
    const pagination = usePagination(1, 12, 5);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });

  test('base=1: N pages, active is in the last block', () => {
    const expected = ['1', '2', '...', '9', '*10', '11', '12'];
    const pagination = usePagination(1, 12, 10);
    const mappedForTesting = pagination.pages.map((p) => p.internal);
    expect(mappedForTesting).toEqual(expected);
  });
});
