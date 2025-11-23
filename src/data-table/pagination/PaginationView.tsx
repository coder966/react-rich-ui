import PaginationPage from './types/PaginationPage';
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

import PaginationViewProps from './types/PaginationViewProps';
import usePagination from './usePagination';

const PaginationView = ({ base, totalPages, currentPage, onChangePage }: PaginationViewProps) => {
  const { pages, isFirstPage, isLastPage } = usePagination(base, totalPages, currentPage);

  const onClickPage = (page: PaginationPage) => {
    if (page.number !== undefined && page.number !== currentPage) {
      onChangePage(page.number);
    }
  };

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        <li
          className={`page-item ${isFirstPage || pages.length == 0 ? 'disabled' : ''}`}
          onClick={() => !isFirstPage && pages.length > 0 && onChangePage(currentPage - 1)}>
          <button className='page-link' aria-label='Previous'>
            &laquo;
          </button>
        </li>

        {pages.map((p, index) => {
          return (
            <li
              key={index}
              data-page-number={p.number}
              onClick={(e) => onClickPage(p)}
              className={`page-item ${p.isActive ? 'active' : ''} ${p.number === undefined ? 'disabled' : ''}`}>
              <button className='page-link'>{p.render}</button>
            </li>
          );
        })}

        <li
          className={`page-item ${isLastPage ? 'disabled' : ''}`}
          onClick={() => !isLastPage && onChangePage(currentPage + 1)}>
          <button className='page-link' aria-label='Next'>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationView;
