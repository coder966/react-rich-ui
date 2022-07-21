import React from 'react';
import PaginationPage from './types/PaginationPage';
import PaginationViewProps from './types/PaginationViewProps';
import usePagination from './usePagination';

const PaginationView = ({
  base,
  totalPages,
  currentPage,
  onChangePage
}: PaginationViewProps) => {

  const { pages, isFirstPage, isLastPage } = usePagination(base, totalPages, currentPage);

  const onClickPage = (page: PaginationPage) => {
    if (page.number !== undefined && page.number !== currentPage) {
      onChangePage(page.number);
    }
  }

  return <nav>
    <ul className='pagination justify-content-center'>

      <li
        className={`page-item ${isFirstPage || pages.length == 0 ? 'disabled' : ''}`}
        onClick={() => !isFirstPage && pages.length > 0 && onChangePage(currentPage - 1)}>
        <button className='page-link' aria-label='Previous'>&laquo;</button>
      </li>

      {pages.map((p, index) => {
        return <li
          key={index}
          onClick={(e) => onClickPage(p)}
          className={`page-item ${p.isActive ? 'active' : ''} ${p.number === undefined ? 'disabled' : ''}`}>
          <button className='page-link' >{p.render}</button>
        </li>
      })}

      <li
        className={`page-item ${isLastPage ? 'disabled' : ''}`}
        onClick={() => !isLastPage && onChangePage(currentPage + 1)}>
        <button className='page-link' aria-label='Next'>&raquo;</button>
      </li>

    </ul>
  </nav>
}

export default PaginationView;
