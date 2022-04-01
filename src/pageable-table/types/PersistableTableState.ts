interface PersistableTableState {
  search?: object,
  totalPages: number;
  currentPage: number;
  sortBy?: string;
  sortDir?: string;
}

export default PersistableTableState;
