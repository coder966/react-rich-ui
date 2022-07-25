/*
 * Copyright 2022 Khalid H. Alharisi
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
import SortDir from "../types/SortDir";
import DataSourcePage from "./types/DataSourcePage";


// dynamically load Axios
let axios: any = undefined;
try {
  axios = require('axios');
} catch (e) {
  console.debug('Axios is not installed. Falling back to fetch');
}


const fetchPageFromHttpApi = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
): Promise<DataSourcePage> => {

  return new Promise((resolve, reject) => {
    if (axios) {

      axios({
        method: requestMethod,
        url: url,
        params: params,
        data: body,
      })
        .then((res: any) => resolve(res.data))
        .catch((err: any) => reject(err));

    } else {

      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => searchParams.append(key, params[key] + ''));

      const requestOptions = {
        method: requestMethod,
        body: JSON.stringify(body),
      };

      fetch(url + '?' + searchParams, requestOptions)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));

    }
  });
}


const fetchPageFromArray = (
  data: any[],
  pageSize: number, pageNumber: number,
  sortKey: string | undefined, sortDir: SortDir,
  search: any,
): Promise<DataSourcePage> => {

  return new Promise((resolve, reject) => {
    const filtered = data.filter(item => {
      for (let key in item) {
        console.log(key);
      }
    });

    const sorted = filtered;

    const requestedPage = sorted;

    resolve({
      totalPages: 1,
      content: requestedPage,
    });

  });
}


export { fetchPageFromHttpApi, fetchPageFromArray };
