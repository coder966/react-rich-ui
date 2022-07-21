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

import RequestMethod from "../types/RequestMethod";

const createRequestParams = (
  requestMethod: RequestMethod,
  currentPage: number,
  pageSize: number,
  search: any,
  sortBy: string | undefined,
  sortDir: string | undefined
): object => {

  let params = {
    page: currentPage,
    size: pageSize,
    sort: sortBy ? sortBy + ',' + (sortDir ? sortDir : '') : '',
  };

  if (requestMethod === 'GET') {
    params = { ...search, ...params };
  }

  return params;
}

const createRequestBody = (
  requestMethod: RequestMethod,
  currentPage: number,
  pageSize: number,
  search: any,
  sortBy: string | undefined,
  sortDir: string | undefined
): object => {

  let body = {};

  if (requestMethod === 'POST') {
    body = { ...search };
  }

  return body;
}

export { createRequestParams, createRequestBody };
