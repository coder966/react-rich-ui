import PaginationPage from "./PaginationPage";

export default interface Pagination {
  pages: PaginationPage[],
  isFirstPage: boolean,
  isLastPage: boolean,
}
