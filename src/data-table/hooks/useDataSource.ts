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

import { useRef, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import ChangeCallback from '../types/ChangeCallback';
import PageFetcher from '../types/PageFetcher';
import SortDir from '../types/SortDir';

const useDataSource = (
  pageFetcher: PageFetcher,
  pageSize: number,
  pageNumber: number,
  sortKey: string | undefined,
  sortDir: SortDir,
  search: any,
  onChange?: ChangeCallback
) => {
  const [isLoading, setIsLoading] = useState(false);
  const requestId = useRef(0);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any[]>([]);

  useAsyncEffect(async () => {
    setIsLoading(true);

    const reqId = new Date().getTime();
    requestId.current = reqId;

    try {
      const body = await pageFetcher(pageSize, pageNumber, sortKey, sortDir, search);

      if (requestId.current !== reqId) {
        console.debug(
          `ignoring former response from requestId=${reqId} because the current requestId=${requestId.current}`
        );
        return;
      }

      if (isNaN(body.totalPages) || !body.items || !Array.isArray(body.items)) {
        throw Error('Something went wrong in your page fetcher');
      }

      setError(null);
      setTotalPages(body.totalPages);
      setData(body.items);
    } catch (e: any) {
      console.error('Error in useDataSource', e);

      setError(e);
      setTotalPages(0);
      setData([]);
    }

    if (onChange) {
      onChange(pageNumber, sortKey, sortDir);
    }

    setIsLoading(false);
  }, [pageSize, pageNumber, sortKey, sortDir, search]);

  return {
    isLoading: isLoading,
    error: error,
    totalPages: totalPages,
    data: data,
  };
};

export default useDataSource;
