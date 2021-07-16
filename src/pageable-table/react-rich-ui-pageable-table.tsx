import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import RruButton from '../button/react-rich-ui-button';
import { isObjKey } from '../utils/utilFunction';
import PersistableTableData from './types/PersistableTableData';
import SpringPage from './types/SpringPage';
import TableAction from './types/TableAction';
import TableColumn from './types/TableColumn';
import TableDataRow from './types/TableDataRow';

// dynamically load Axios
let axios: any;
try {
  axios = require('axios');
} catch (e) {
  console.log('Axios is not installed. Falling back to fetch');
}

export interface RruPageableTableProps {
  id?: string;
  endpoint: string;
  columns: TableColumn[];
  actions?: TableAction[];
  actionsLabel?: React.ReactNode;
  search?: object;
  pageSize: number;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  noDataLabel?: React.ReactNode;
  disableSorting?: boolean;
  userPrivileges?: string[];
  onResponse?: (body: object) => void;
}

/**
 * @author coder966
 */
const RruPageableTable: FC<RruPageableTableProps> = ({ id, endpoint, columns, actions, actionsLabel, search, pageSize, previousLabel, nextLabel, noDataLabel, disableSorting, userPrivileges, onResponse }) => {
  const getInitialState = (): PersistableTableData => {
    const persistedData = sessionStorage.getItem('RruPageableTable_' + id);
    if (persistedData) {
      return JSON.parse(persistedData);
    } else {
      return { currentPage: 0, sortBy: 'id', sortDir: 'desc' };
    }
  };

  const persistState = (state: PersistableTableData) => {
    sessionStorage.setItem('RruPageableTable_' + id, JSON.stringify(state));
  };

  // fetched
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [currentPage, setCurrentPage] = useState(getInitialState().currentPage);

  // flags
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // sort
  const [sortBy, setSortBy] = useState(getInitialState().sortBy);
  const [sortDir, setSortDir] = useState(getInitialState().sortDir);

  // defaults
  const mSort = sortBy ? sortBy + ',' + (sortDir ? sortDir : '') : '';

  useEffect(() => {
    persistState({ currentPage, sortBy, sortDir });
  }, [currentPage, sortBy, sortDir]);

  // reset page to 0 when the search changes
  useEffect(() => {
    if (currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [search]);

  // reload list when search, page, sort changes
  useEffect(() => {
    setIsLoading(true);

    const params = {
      page: currentPage,
      size: pageSize,
      sort: mSort,
      ...search,
    };

    // create an abstract promise for different HTTP client libs
    const dataPromise = new Promise((resolve: (data: SpringPage) => void, reject) => {
      if (axios) {
        axios(endpoint, { params: params })
          .then((res: any) => resolve(res.data))
          .catch((err: any) => reject(err));
      } else {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          if (isObjKey(params, key)) {
            searchParams.append(key, params[key] + '');
          }
        });
        fetch(endpoint + '?' + searchParams)
          .then((res) => res.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    });

    // handle promise result
    dataPromise
      .then((data: SpringPage) => {
        setIsLoading(false);
        setTotalPages(data.totalPages);
        setData(data.content);
        if (onResponse) {
          onResponse(data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
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

  const resolve = (path: string, obj: object): any => {
    path.split('.').reduce((prev: object | null, curr: string) => (prev && isObjKey(prev, curr) ? prev[curr] : null), obj);
  };

  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            {columns.map(
              (col, index) =>
                (col.display === undefined || col.display) && (
                  <th key={index} className={(!disableSorting && getSortClassName(col)) + (isLoading ? ' rru-pageable-table-loading-upper-th' : '')} onClick={() => onSort(col)}>
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
                An Error Occurred
              </td>
            </tr>
          )}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className='rru-pageable-table-centered'>
                {noDataLabel || 'No Data'}
              </td>
            </tr>
          )}

          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (col.display === undefined || col.display) && <td key={j}>{typeof col.value === 'function' ? col.value(row) : col.value === '#' ? getSerialNo(i) : resolve(col.value, row)}</td>)}
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
      <ReactPaginate previousLabel={previousLabel} nextLabel={nextLabel} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={3} onPageChange={(event) => setCurrentPage(event.selected)} forcePage={currentPage} containerClassName='pagination' pageLinkClassName='pageLink' previousClassName='previous' nextClassName='next' disabledClassName='disabled' activeClassName='activePage' />
    </>
  );
};

RruPageableTable.defaultProps = {
  pageSize: 10,
  actionsLabel: '',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  noDataLabel: 'No Data',
  disableSorting: false,
};

export default RruPageableTable;
