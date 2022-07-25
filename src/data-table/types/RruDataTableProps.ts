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

interface StateProps {

  /**
   * The default page number
   */
  defaultPageNumber?: number,

  /**
   * The default sort key
   */
  defaultSortKey?: string,

  /**
   * The default sort direction
   */
  defaultSortDir?: 'asc' | 'desc',

  /**
   * A callback for when one of these information gets updated:
   * - current page number
   * - current sort key
   * - current sort direction 
   */
  onChange?: (pageNumber: number, sortKey?: string, sortDir?: 'asc' | 'desc') => void

}

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
  onResponse?: (body: any) => void;

}


interface RruDataTableProps extends StateProps, ApiDataSourceProps {

  /**  */
  columns: TableColumn[];

  /** 
   * The search params object
   */
  search?: any;

  /**  */
  pageSize: number;

  /** 
   * Message rendered when there is no data available
   */
  noDataLabel?: React.ReactNode;


  /** 
   * Message rendered when there is an error
   */
  errorLabel?: React.ReactNode;

}

export default RruDataTableProps;
