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

import RejectFunction from "./types/RejectFunction";
import ResolveFunction from "./types/ResolveFunction";

const fetchPageUsingAxios = (
  data: any[],

  currentPage: number,
  pageSize: number,

  search: object,
  sortBy: string,
  sortDir: string,

  resolve: ResolveFunction,
  reject: RejectFunction
) => {

  const filtered = data.filter(item => {
    for (let key in item) {
      console.log(key);
    }
  });

  const sorted = filtered;

  const requestedPage = sorted;

  resolve({
    totalPages: 1,
    currentPage: 0,
    content: requestedPage,
  });

}

export default fetchPageUsingAxios;
