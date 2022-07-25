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

import React, { FC, useEffect, useState } from 'react';
import { resolveObjectAttribute } from '../utils/utils';
import fetchPage from './fetch-page/fetchPage';
import RruDataTablePage from './fetch-page/types/RruDataTablePage';
import PaginationView from './pagination/PaginationView';
import './style.css';
import RruDataTableProps from './types/RruDataTableProps';
import TableColumn from './types/TableColumn';

const RruDataTable: FC<RruDataTableProps> = ({
  endpoint,
  requestMethod = 'GET',
  columns,
  search,
  pageSize = 10,
  onResponse,
  noDataLabel = 'No Data',
  apiErrorLabel = 'API Error',

  // state props
  defaultPageNumber,
  defaultSortKey,
  defaultSortDir,
  onChange,
}: RruDataTableProps) => {

  // fetched
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNumber || 0);
  const [data, setData] = useState<any[]>([]);

  // flags
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forceReFetch, setForceReFetch] = useState<number>(0);

  // sort
  const [sortBy, setSortBy] = useState(defaultSortKey);
  const [sortDir, setSortDir] = useState(defaultSortDir);

  // reset page to 0 when the search changes or when sort changes
  useEffect(() => {
    setCurrentPage(0);
    // we need this because if the user searches or changes sort and is on page 0
    // then setting setCurrentPage(0); will not cause the other userEffect to run
    setForceReFetch(new Date().getTime());
  }, [search, sortBy, sortDir]);

  // reload list when search, page, sort changes
  useEffect(() => {
    setIsLoading(true);
    fetchPage(requestMethod, endpoint, currentPage, pageSize, search, sortBy, sortDir)
      .then((page: RruDataTablePage) => {
        setError(null);
        setTotalPages(page.totalPages);
        setData(page.content);
        if (onResponse) {
          onResponse(data);
        }
      })
      .catch((err) => {
        setError(err);
        setTotalPages(0);
        setData([]);
      })
      .finally(() => {
        if (onChange) {
          onChange(currentPage, sortBy, sortDir);
        }
        setIsLoading(false);
      });
  }, [currentPage, forceReFetch]);

  const getSerialNo = (index: number) => currentPage * pageSize + (index + 1);

  const getSortKey = (col: TableColumn) => {
    if (col.sortKey === undefined) {
      if (typeof col.value === 'function') {
        return col.sortKey;
      } else if (col.value !== '#') {
        return col.value;
      }
    }
    return col.sortKey;
  };

  const getThClassName = (col: TableColumn) => {
    let result = 'rru-data-table__th';
    const sortKey = getSortKey(col);
    if (sortKey) {
      if (sortKey === sortBy) {
        result += ' rru-data-table__th--sortable rru-data-table__th--sortable-' + sortDir;
      } else {
        result += ' rru-data-table__th--sortable';
      }
    }
    return result;
  };

  const onSort = (col: TableColumn) => {
    const sortKey = getSortKey(col);
    if (sortKey) {
      if (sortBy !== sortKey) {
        setSortBy(sortKey);
      }
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <div>
      <table className='table table-striped rru-data-table'>
        <thead>
          <tr>
            {columns.map((col, index) =>
              <th key={index} className={getThClassName(col)} onClick={() => onSort(col)}>
                {col.label}
              </th>
            )}
          </tr>
        </thead>
        <tbody>

          <tr className={`rru-data-table__loading-bar-tr--${isLoading ? 'visible' : 'hidden'}`}>
            <td colSpan={columns.length} className='rru-data-table__loading-bar-td'>
              <div className='rru-data-table__loading-bar'></div>
            </td>
          </tr>
          {error && (
            <tr>
              <td colSpan={columns.length} className='text-center'>
                {apiErrorLabel}
              </td>
            </tr>
          )}
          {data.length === 0 && !error && (
            <tr>
              <td colSpan={columns.length} className='text-center'>
                {noDataLabel}
              </td>
            </tr>
          )}

          {(data || []).map((row, i) => (
            <tr key={i}>
              {columns.map(
                (col, j) =>
                  <td key={j}>
                    {typeof col.value === 'function'
                      ? col.value(row)
                      : col.value === '#'
                        ? getSerialNo(i)
                        : resolveObjectAttribute(col.value, row)}
                  </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationView base={0} totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
};

export default RruDataTable;

