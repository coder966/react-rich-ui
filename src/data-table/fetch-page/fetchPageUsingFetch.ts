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
import RequestMethod from "./types/RequestMethod";
import ResolveFunction from "./types/ResolveFunction";

const fetchPageUsingFetch = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
  resolve: ResolveFunction,
  reject: RejectFunction
): void => {

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

export default fetchPageUsingFetch;
