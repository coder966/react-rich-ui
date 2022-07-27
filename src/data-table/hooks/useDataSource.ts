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
import FetchedPage from "../types/FetchedPage";
import PageFetcher from "../types/PageFetcher";
import SortDir from "../types/SortDir";

const useDataSource = (
  pageFetcher: PageFetcher,
  pageSize: number, pageNumber: number,
  sortKey: string | undefined, sortDir: SortDir,
  search: any,
  onChange?: ChangeCallback
) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    pageFetcher(pageSize, pageNumber, sortKey, sortDir, search)
      .then((body: FetchedPage) => {
        if (isNaN(body.totalPages) || !body.items || !Array.isArray(body.items)) {
          throw 'Something went wrong in your page fetcher';
        }
        setError(null);
        setTotalPages(body.totalPages);
        setData(body.items);
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
  }, [pageFetcher, pageSize, pageNumber, sortKey, sortDir, search, onChange]);

  return {
    isLoading: isLoading,
    error: error,
    totalPages: totalPages,
    data: data
  }
}

export default useDataSource;
