import Pagination from "./types/Pagination";
import PaginationPage from "./types/PaginationPage";

const MIN_PAGES_PER_BLOCK = 2;

/**
 * Note that the parameter is the page index not the page number.
 * @param index The page index. Zero based
 */
const isPageIndexVisible = (array: readonly number[], index: number, currentPageIndex: number): boolean => {
  const pagesOnEachSideOfTheActivePage = Math.floor(MIN_PAGES_PER_BLOCK / 2);

  const isInStartBlock = index < MIN_PAGES_PER_BLOCK;
  const isInEndBlock = index > array.length - 1 - MIN_PAGES_PER_BLOCK;
  const isInMiddleBlock =
    (index > currentPageIndex - pagesOnEachSideOfTheActivePage - 1) &&
    (index < currentPageIndex + pagesOnEachSideOfTheActivePage + 1);

  return isInStartBlock || isInEndBlock || isInMiddleBlock;
}

const usePagination = (base: number, totalPages: number, currentPage: number): Pagination => {
  // validate base
  const nBase = (base === 0 ? 1 : 0);
  if (base !== 0 && base !== 1) {
    base = 0;
  }

  // validate current page
  if (currentPage < base) {
    currentPage = base;
  }
  if (currentPage > totalPages - nBase) {
    currentPage = totalPages - nBase;
  }

  // generate page numbers
  const numbers: number[] = [];
  for (let i = base; i < totalPages + base; i++) {
    numbers.push(i);
  }

  // filter page numbers
  const currentPageIndex = currentPage - base;
  const filtered: number[] = numbers.filter((n, i) => isPageIndexVisible(numbers, i, currentPageIndex));

  // map to PaginationPage
  const mapped: PaginationPage[] = filtered.map(n => ({
    number: n,
    isActive: n === currentPage,
    render: (base === 0 ? n + 1 : n) + '',
    internal: n === currentPage ? '*' + n : n + '',
  }));

  // add '...' between blocks
  const pages: PaginationPage[] = [];
  for (let i = 0; i < mapped.length; i++) {
    const curr = mapped[i];
    const next = mapped[i + 1];

    pages.push(curr);

    if (next && curr.number && curr.number + 1 !== next.number) {
      pages.push({
        number: undefined,
        isActive: false,
        render: '...',
        internal: '...',
      });
    }
  }

  return {
    pages: pages,
    isFirstPage: currentPage === base,
    isLastPage: currentPage === totalPages - nBase,
  }
}

export default usePagination;
