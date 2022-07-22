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

import TableColumn from "./TableColumn";

interface RruPageableTableProps {

  /** Spring Page api endpoint */
  endpoint: string;

  /** 
   * Specify the HTTP method to be used when sending the API request.
   * By default it uses GET.
   * If GET is used, then the pagination object and the search object are merged and sent in the request query string.
   * If POST is used, then the pagination is sent in the request query string while the search object is sent in the body. (This is because Spring does not directly support reading Pageable from request body)
   */
  requestMethod?: 'GET' | 'POST',

  /**  */
  columns: TableColumn[];

  /** The search params object. */
  search?: object;

  /** use `getRetainedTableSearchObject` to read the retained object */
  retainTableState?: boolean;

  /**  */
  pageSize: number;

  /** */
  defaultSortBy?: string,

  /** */
  defaultSortDir?: 'asc' | 'desc',

  /** A callback function in case you want to do anything with response of the api */
  onResponse?: (body: object) => void;

  /** Rendered when no data has been returned from the api. */
  noDataLabel?: React.ReactNode;

  /** Rendered when no data has been returned from the api. */
  apiErrorLabel?: React.ReactNode;
}

export default RruPageableTableProps;
