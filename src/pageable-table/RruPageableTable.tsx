import React, { FC, useEffect, useState } from 'react';
import { resolveObjectAttribute } from '../utils/utils';
import PaginationView from './Pagination/PaginationView';
import './style.css';
import { getApiResultPromise } from './table-network';
import { getPersistedTableState, persistTableState } from './table-state-persistence';
import RruPageableTableProps from './types/RruPageableTableProps';
import SpringPage from './types/SpringPage';
import TableColumn from './types/TableColumn';
import TableDataRow from './types/TableDataRow';

/**
 * A table the features:
 *  1- Declarative API.
 *  2- Handles API networking.
 *  3- Handles pagination.
 *  4- Allows search + sort.
 *  5- Compatible with Spring (Page+Pageable) interfaces.
 *  6- Capable of retaining its state (search params + sort + current page) after re-mounting.
 *
 * @author coder966
 */
const RruPageableTable: FC<RruPageableTableProps> = ({
  endpoint,
  requestMethod = 'GET',
  columns,
  search,
  retainTableState = false,
  pageSize = 10,
  disableSorting = false,
  defaultSortBy,
  defaultSortDir,
  onResponse,
  noDataLabel = 'No Data',
  apiErrorLabel = 'API Error',
}: RruPageableTableProps) => {

  // fetched
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<TableDataRow[]>([]);

  // flags
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forceReFetch, setForceReFetch] = useState<number>(0);

  // sort
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortDir, setSortDir] = useState(defaultSortDir);

  /**
   * init
   */
  useEffect(() => {
    const persisted = getPersistedTableState(endpoint);
    if (retainTableState && persisted) {
      setTotalPages(persisted.totalPages);
      setCurrentPage(persisted.currentPage);
      setSortBy(persisted.sortBy);
      setSortDir(persisted.sortDir);
    }
  }, []);

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
    let newTotalPage: number;
    let newCurrentPage: number;

    getApiResultPromise(requestMethod, endpoint, currentPage, pageSize, search, sortBy, sortDir)
      .then((data: SpringPage) => {
        setError(null);
        setTotalPages(data.totalPages);
        setData(data.content);
        newTotalPage = data.totalPages;
        newCurrentPage = currentPage;
        if (onResponse) {
          onResponse(data);
        }
      })
      .catch((err) => {
        setError(err);
        setTotalPages(0);
        newTotalPage = 0;
        newCurrentPage = 0;
        setData([]);
      })
      .finally(() => {
        if (retainTableState) {
          persistTableState(endpoint, {
            search: search,
            totalPages: newTotalPage,
            currentPage: newCurrentPage,
            sortBy: sortBy,
            sortDir: sortDir,
          });
        }
        setIsLoading(false);
      });
  }, [currentPage, forceReFetch]);

  const getSerialNo = (index: number) => currentPage * pageSize + (index + 1);

  const getSortKey = (col: TableColumn) => {
    if (col.sortable === undefined || col.sortable) {
      if (typeof col.value === 'function') {
        return col.sortKey;
      } else if (col.value !== '#') {
        return col.value;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  const getSortClassName = (col: TableColumn) => {
    const sortKey = getSortKey(col);
    if (sortKey) {
      if (sortKey === sortBy) {
        return 'sortable ' + sortDir;
      } else {
        return 'sortable';
      }
    } else {
      return '';
    }
  };

  const onSort = (col: TableColumn) => {
    const sortKey = getSortKey(col);
    if (sortKey && !disableSorting) {
      if (sortBy !== sortKey) {
        setSortBy(sortKey);
      }
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <div>
      <table className='table table-striped'>
        <thead>
          <tr>
            {columns.map(
              (col, index) =>
                (col.display === undefined || col.display) && (
                  <th
                    key={index}
                    className={
                      (!disableSorting && getSortClassName(col)) +
                      (isLoading ? ' rru-pageable-table-loading-upper-th' : '')
                    }
                    onClick={() => onSort(col)}
                  >
                    {col.label}
                  </th>
                )
            )}
          </tr>
          {isLoading && (
            <tr>
              <th colSpan={columns.length} className='rru-pageable-table-loading-th'>
                <div className='progressBar'>
                  <div className='indeterminate'></div>
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {error && (
            <tr>
              <td colSpan={columns.length} className='rru-pageable-table-centered'>
                {apiErrorLabel}
              </td>
            </tr>
          )}
          {data.length === 0 && !error && (
            <tr>
              <td colSpan={columns.length} className='rru-pageable-table-centered'>
                {noDataLabel}
              </td>
            </tr>
          )}

          {(data || []).map((row, i) => (
            <tr key={i}>
              {columns.map(
                (col, j) =>
                  (col.display === undefined || col.display) && (
                    <td key={j}>
                      {typeof col.value === 'function'
                        ? col.value(row)
                        : col.value === '#'
                          ? getSerialNo(i)
                          : resolveObjectAttribute(col.value, row)}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationView base={0} totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
};

export default RruPageableTable;

