interface PersistableTableState {
  totalPages: number;
  currentPage: number;
  sortBy?: string;
  sortDir?: string;
}

export default PersistableTableState;
