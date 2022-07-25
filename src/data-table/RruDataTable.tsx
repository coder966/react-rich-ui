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

import React, { FC, useState } from 'react';
import { resolveObjectAttribute } from '../utils/utils';
import useDataSource from './fetch-page/useDataSource';
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
  errorLabel = 'Error',

  // state props
  defaultPageNumber,
  defaultSortKey,
  defaultSortDir,
  onChange,
}: RruDataTableProps) => {

  const [currentPage, setCurrentPage] = useState(defaultPageNumber || 0);
  const [sortBy, setSortBy] = useState(defaultSortKey);
  const [sortDir, setSortDir] = useState(defaultSortDir);

  const {
    isLoading,
    error,
    totalPages,
    data
  } = useDataSource(endpoint, requestMethod, onResponse, pageSize, currentPage, sortBy, sortDir, search, onChange);

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
        setSortDir('asc');
      } else {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      }
      setCurrentPage(0);
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
                {errorLabel}
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

