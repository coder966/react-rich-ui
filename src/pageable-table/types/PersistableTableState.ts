interface PersistableTableState {
  search?: {
    [key: string]: any;
  },
  totalPages: number;
  currentPage: number;
  sortBy?: string;
  sortDir?: string;
}

export default PersistableTableState;
