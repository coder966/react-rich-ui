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

import { FC, useEffect, useState } from 'react';
import { resolveObjectAttribute } from '../utils/utils';
import useDataSource from './hooks/useDataSource';
import PaginationView from './pagination/PaginationView';
import './style.css';
import RruDataTableProps from './types/RruDataTableProps';
import SortDir from './types/SortDir';
import TableColumn from './types/TableColumn';

const RruDataTable: FC<RruDataTableProps> = ({
  pageFetcher,
  columns,
  search,
  pageSize = 10,
  noDataLabel = 'No Data',
  errorLabel = 'Error',

  // state props
  defaultPageNumber,
  defaultSortKey,
  defaultSortDir,
  onChange,
}: RruDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(defaultPageNumber || 0);
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortDir, setSortDir] = useState<SortDir>(defaultSortDir);
  const [searchParams, setSearchParams] = useState<any>(search);

  useEffect(() => {
    setSearchParams(search);
    setCurrentPage(0);
  }, [search]);

  const { isLoading, error, totalPages, data } = useDataSource(
    pageFetcher,
    pageSize,
    currentPage,
    sortKey,
    sortDir,
    searchParams,
    onChange
  );

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
    const key = getSortKey(col);
    if (key) {
      if (key === sortKey) {
        result += ' rru-data-table__th--sortable rru-data-table__th--sortable-' + sortDir;
      } else {
        result += ' rru-data-table__th--sortable';
      }
    }
    return result;
  };

  const onSort = (col: TableColumn) => {
    const key = getSortKey(col);
    if (key) {
      if (key !== sortKey) {
        setSortKey(key);
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
            {columns.map((col, index) => (
              <th key={index} className={getThClassName(col)} onClick={() => onSort(col)}>
                {col.label}
              </th>
            ))}
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
              {columns.map((col, j) => (
                <td key={j}>
                  {typeof col.value === 'function'
                    ? col.value(row)
                    : col.value === '#'
                      ? getSerialNo(i)
                      : resolveObjectAttribute(col.value, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationView base={0} totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
};

export default RruDataTable;
