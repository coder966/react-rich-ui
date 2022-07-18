export default interface PaginationViewProps {
  base: number,
  totalPages: number,
  currentPage: number,
  onChangePage: (page: number) => void,
}
