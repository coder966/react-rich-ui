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
}) => {
  const getSearchObject = (): object | undefined => hasBeenInitialized ? search : getPersistedTableState(endpoint)?.search;

  // fetched
  const [totalPages, setTotalPages] = useState(getPersistedTableState(endpoint)?.totalPages || 0);
  const [currentPage, setCurrentPage] = useState(getPersistedTableState(endpoint)?.currentPage || 0);
  const [data, setData] = useState<TableDataRow[]>([]);

  // flags
  const [hasBeenInitialized, setHasBeenInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // sort
  const [sortBy, setSortBy] = useState(getPersistedTableState(endpoint)?.sortBy || defaultSortBy);
  const [sortDir, setSortDir] = useState(getPersistedTableState(endpoint)?.sortDir || defaultSortDir);

  // reset page to 0 when the search changes
  useEffect(() => {
    if (currentPage !== 0 && hasBeenInitialized) {
      setCurrentPage(0);
    }
  }, [search]);

  // reload list when search, page, sort changes
  useEffect(() => {
    setIsLoading(true);
    getApiResultPromise(
      requestMethod, endpoint,
      currentPage, pageSize,
      getSearchObject(),
      sortBy, sortDir
    )
      .then((data: SpringPage) => {
        setError(null);
        setTotalPages(data.totalPages);
        setData(data.content);
        if (retainTableState) {
          persistTableState(endpoint, {
            search: search,
            totalPages: data.totalPages,
            currentPage: currentPage,
            sortBy: sortBy,
            sortDir: sortDir,
          });
        }
        if (!hasBeenInitialized) {
          setHasBeenInitialized(true);
        }
        if (onResponse) {
          onResponse(data);
        }
      })
      .catch((err) => {
        setError(err);
        setTotalPages(0);
        setData([]);
        if (retainTableState) {
          persistTableState(endpoint, {
            search: search,
            totalPages: 0,
            currentPage: 0,
            sortBy: sortBy,
            sortDir: sortDir,
          });
        }
        if (!hasBeenInitialized) {
          setHasBeenInitialized(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, search, sortBy, sortDir]);

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

