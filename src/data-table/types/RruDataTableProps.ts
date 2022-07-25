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


interface ApiDataSourceProps {

  /**
   * API endpoint
   */
  endpoint: string;

  /** 
   * Specify the HTTP method to be used when sending the API request
   */
  requestMethod?: 'GET' | 'POST',

  /** 
   * A callback function in case you want to do anything with the API response
   */
  onResponse?: (body: object) => void;

  /** 
   * A message rendered when the API call fails
   */
  apiErrorLabel?: React.ReactNode;

}

interface RruDataTableProps extends ApiDataSourceProps {

  /**  */
  columns: TableColumn[];

  /** 
   * The search params object
   */
  search?: object;

  /**  */
  pageSize: number;

  /** */
  defaultSortBy?: string,

  /** */
  defaultSortDir?: 'asc' | 'desc',

  /** 
   * Message rendered when there is no data available
   */
  noDataLabel?: React.ReactNode;

  /** 
   * use `getRetainedTableSearchObject` to read the retained object
   */
  retainTableState?: boolean;

}

export default RruDataTableProps;
