import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { RruButton } from '../button/react-rich-ui-button';
import resolveObjectAttribute from '../utils/resolveObjectAttribute';
import './style.css';
import { getApiResultPromise } from './table-network';
import { getFirstPersistedTableState, getPersistedTableState, persistTableState } from './table-state-persistence';
import SpringPage from './types/SpringPage';
import TableAction from './types/TableAction';
import TableColumn from './types/TableColumn';
import TableDataRow from './types/TableDataRow';

export interface RruPageableTableProps {
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

  /**  */
  actions?: TableAction[];

  /** The search params object. */
  search?: object;

  /** use `getRetainedTableSearchObject` to read the retained object */
  retainTableState?: boolean;

  /**  */
  pageSize: number;

  /**  */
  disableSorting?: boolean;

  /** */
  defaultSortBy?: string,
  
  /** */
  defaultSortDir?: 'asc' | 'desc',

  /** A callback function in case you want to do anything with response of the api */
  onResponse?: (body: object) => void;

  /** The column label of the actions */
  actionsLabel?: React.ReactNode;

  /** The label of the previous page button */
  previousLabel?: React.ReactNode;

  /** The label of the next page button */
  nextLabel?: React.ReactNode;

  /** Rendered when no data has been returned from the api. */
  noDataLabel?: React.ReactNode;

  /** Rendered when no data has been returned from the api. */
  apiErrorLabel?: React.ReactNode;

  /**  */
  userPrivileges?: string[];
}

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
  actions,
  search,
  retainTableState = false,
  pageSize = 10,
  disableSorting = false,
  defaultSortBy,
  defaultSortDir,
  onResponse,
  actionsLabel = 'Actions',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  noDataLabel = 'No Data',
  apiErrorLabel = 'API Error',
  userPrivileges,
}) => {
  const getSearchObject = () : object | undefined => hasBeenInitialized ? search : getPersistedTableState(endpoint)?.search;

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
        if(retainTableState){
          persistTableState(endpoint, {
            search: search, 
            totalPages: data.totalPages, 
            currentPage: currentPage, 
            sortBy: sortBy, 
            sortDir: sortDir,
          });  
        }
        if(!hasBeenInitialized){
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
        if(retainTableState){
          persistTableState(endpoint, {
            search: search, 
            totalPages: 0, 
            currentPage: 0, 
            sortBy: sortBy, 
            sortDir: sortDir,
          });  
        }
        if(!hasBeenInitialized){
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
    <>
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
            {actions && <th className={isLoading ? ' rru-pageable-table-loading-upper-th' : ''}>{actionsLabel}</th>}
          </tr>
          {isLoading && (
            <tr>
              <th colSpan={columns.length + (actions ? 1 : 0)} className='rru-pageable-table-loading-th'>
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
              <td colSpan={columns.length + (actions ? 1 : 0)} className='rru-pageable-table-centered'>
                {apiErrorLabel}
              </td>
            </tr>
          )}
          {data.length === 0 && !error && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className='rru-pageable-table-centered'>
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
              {actions && (
                <td>
                  {actions.map((a, k) => {
                    const shouldDisplay = (typeof a.display === 'function' && a.display(row)) || !a.display;
                    return shouldDisplay ? (
                      <RruButton
                        key={k}
                        label={a.label}
                        icon={typeof a.icon === 'function' ? a.icon(row) : a.icon}
                        userPrivileges={userPrivileges}
                        allowedPrivileges={a.privileges}
                        confirmationTitle={a.confirmationTitle}
                        confirmationDesc={a.confirmationDesc}
                        cancelLabel={a.cancelLabel}
                        confirmLabel={a.confirmLabel}
                        onConfirm={
                          a.onConfirm
                            ? () => {
                                if (a.onConfirm) {
                                  a.onConfirm(row);
                                }
                                return true;
                              }
                            : undefined
                        }
                        onClick={() => a.action(row)}
                      />
                    ) : null;
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(event) => setCurrentPage(event.selected)}
        forcePage={currentPage}
        containerClassName='pagination'
        pageLinkClassName='pageLink'
        previousClassName='previous'
        nextClassName='next'
        disabledClassName='disabled'
        activeClassName='activePage'
      />
    </>
  );
};

/**
 * If you don't specify the endpoint it will return the first table data in the current page.
 */
const getRetainedTableSearchObject = (endpoint?: string) : {[key: string]: any;} | undefined => {
  if(endpoint){
    return getPersistedTableState(endpoint)?.search;
  }else{
    return getFirstPersistedTableState()?.search;
  }
}

export { RruPageableTable, getRetainedTableSearchObject };

