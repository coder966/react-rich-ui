import React, {useState, useEffect} from 'react';
import { Pagination, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import RruButton from '../button/react-rich-ui-button';
import axios from 'axios';
import './style.css'

/**
 * @author coder966
 */
const RruPageableTable = ({endpoint, columns, actions, actionsLabel, search, pageSize, previousLabel, nextLabel, disableSorting, userPrivileges, forcePage}) => {
  // fetched
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // flags
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // sort
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  // defaults
  const mPageSize = pageSize ? pageSize : 10;
  const mSort = sortBy ? (sortBy+','+(sortDir ? sortDir : '')) : '';

  useEffect(() => {
    setIsLoading(true);
    axios.get(endpoint, {
      params: {
        page: currentPage,
        size: mPageSize,
        sort: mSort,
        ...search
      }
    })
    .then(res => {
      setIsLoading(false);
      setTotalPages(res.data.totalPages);
      setData(res.data.content);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err);
    })
  }, [currentPage, search, sortBy, sortDir]);

  const getSerialNo = index => (currentPage*mPageSize)+(index+1);

  const getSortKey = col => {
    if(col.sortable === undefined || col.sortable){
      if(typeof col.value === 'function'){
        return col.sortKey;
      }else if(col.value !== '#'){
        return col.value;
      }else{
        return undefined;
      }
    }else{
      return undefined;
    }
  };

  const getSortClassName = col => {
    const sortKey = getSortKey(col);
    if(sortKey){
      if(sortKey === sortBy){
        return 'sortable '+sortDir;
      }else{
        return 'sortable';
      }
    }else{
      return '';
    }
  };

  const onSort = col => {
    const sortKey = getSortKey(col);
    if(sortKey){
      if(sortBy !== sortKey){
        setSortBy(sortKey);
      }
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');  
    }
  };

  const resolve = (path, obj) => path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            {columns.map((col, index) => (col.display === undefined || col.display) &&
              <th key={index} className={!disableSorting && getSortClassName(col)} onClick={!disableSorting && (e => onSort(col))}>
                {col.label}
              </th>
            )}
            {actions && <th>{actionsLabel}</th>}
          </tr>
        </thead>
        <tbody>

          {isLoading && 
            <>
              <tr>
                <td colSpan={columns.length+(actions ? 1 : 0)} className='rru-pageable-table-loading-td'>
                </td>
              </tr>
              <tr>
                <td colSpan={columns.length+(actions ? 1 : 0)} className='rru-pageable-table-loading-td'>
                  <div colSpan={columns.length+(actions ? 1 : 0)}  className='progressBar'>
                    <div className='indeterminate'></div>
                  </div>
                </td>
              </tr>
            </>
          }

          {data.length === 0 && 
            <tr>
              <td colSpan={columns.length+(actions ? 1 : 0)} className='rru-pageable-table-centered'>لا توجد بيانات لعرضها</td>
            </tr>
          }

          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (col.display === undefined || col.display) && <td key={j}>{typeof col.value === 'function' ? col.value(row) : col.value === '#' ? getSerialNo(i) : resolve(col.value, row)}</td>)}
              {actions &&
                <td>
                  {actions.map((a, k) => {
                    return (!a.display || a.display(row)) ? <RruButton key={k} labelId={a.labelId} icon={typeof a.icon === 'function' ? a.icon(row) : a.icon} userPrivileges={userPrivileges} allowedPrivileges={a.privileges} confirmationTitle={a.confirmationTitle} confirmationDesc={a.confirmationDesc} cancelLabel={a.cancelLabel} confirmLabel={a.confirmLabel} onConfirm={a.onConfirm ? () => a.onConfirm(row) : undefined} onClick={() => a.action(row)} /> : null;
                  })}
                </td>
              }
            </tr>
          ))}

        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        breakLabel={<a>...</a>}
        breakClassName='break'
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={event => setCurrentPage(event.selected)}
        forcePage={forcePage}
        containerClassName='pagination'
        pageLinkClassName='pageLink'
        previousClassName='previous'
        nextClassName='next'
        disabledClassName='disabled'
        activeClassName='activePage'
        />
    </>
  )
}

export default RruPageableTable;
