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

import fetchPageUsingAxios from "./fetchPageUsingAxios";
import fetchPageUsingFetch from "./fetchPageUsingFetch";
import loadAxios from "./loadAxios";
import { createRequestBody, createRequestParams } from "./rest-api-datasource/spring-datasource";
import RejectFunction from "./types/RejectFunction";
import RequestMethod from "./types/RequestMethod";
import ResolveFunction from "./types/ResolveFunction";
import RruDataTablePage from "./types/RruDataTablePage";

/**
 * Creates an abstract promise for different HTTP client libs
 * @returns Promise
 */
const fetchDataSource = (
  requestMethod: RequestMethod,
  endpoint: string,

  currentPage: number,
  pageSize: number,

  search?: any,
  sortBy?: string,
  sortDir?: string
): Promise<RruDataTablePage> => {

  // prepare request info
  const params = createRequestParams(requestMethod, currentPage, pageSize, search, sortBy, sortDir);
  const body = createRequestBody(requestMethod, currentPage, pageSize, search, sortBy, sortDir);

  return new Promise((resolve: ResolveFunction, reject: RejectFunction) => {
    if (loadAxios()) {
      fetchPageUsingAxios(requestMethod, endpoint, params, body, resolve, reject);
    } else {
      fetchPageUsingFetch(requestMethod, endpoint, params, body, resolve, reject);
    }
  });
};

export default fetchDataSource;
