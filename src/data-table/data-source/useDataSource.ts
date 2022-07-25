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

import { useEffect, useState } from "react";
import ChangeCallback from "../types/ChangeCallback";
import RequestMethod from "../types/RequestMethod";
import ResponseCallback from "../types/ResponseCallback";
import SortDir from "../types/SortDir";
import { fetchPageFromArray, fetchPageFromHttpApi } from "./fetch-page";
import { createRequestBody, createRequestParams } from "./rest-api-datasource/spring-datasource";
import DataSourcePage from "./types/DataSourcePage";

const useDataSource = (
  dataSource: string | Record<string, any>[],
  requestMethod: RequestMethod, onResponse: ResponseCallback,
  pageSize: number, pageNumber: number,
  sortKey: string | undefined, sortDir: SortDir,
  search: any,
  onChange?: ChangeCallback
) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any[]>([]);

  // reload list when search, page, sort changes
  useEffect(() => {
    setIsLoading(true);

    let promise: Promise<DataSourcePage>;

    if (typeof dataSource === 'string') {
      const params = createRequestParams(requestMethod, pageNumber, pageSize, search, sortKey, sortDir);
      const body = createRequestBody(requestMethod, pageNumber, pageSize, search, sortKey, sortDir);
      promise = fetchPageFromHttpApi(requestMethod, dataSource, params, body);
    } else {
      promise = fetchPageFromArray(dataSource, pageSize, pageNumber, sortKey, sortDir, search);
    }

    promise
      .then((body: DataSourcePage) => {
        setError(null);
        setTotalPages(body.totalPages);
        setData(body.content);
        if (onResponse) {
          onResponse(body);
        }
      })
      .catch((err) => {
        setError(err);
        setTotalPages(0);
        setData([]);
      })
      .finally(() => {
        if (onChange) {
          onChange(pageNumber, sortKey, sortDir);
        }
        setIsLoading(false);
      });

  }, [dataSource, requestMethod, onResponse, pageSize, pageNumber, sortKey, sortDir, search]);


  return {
    isLoading: isLoading,
    error: error,
    totalPages: totalPages,
    data: data
  }
}

export default useDataSource;
