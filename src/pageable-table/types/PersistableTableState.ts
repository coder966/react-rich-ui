interface PersistableTableState {
  search?: {
    [key: string]: any;
  },
  totalPages: number;
  currentPage: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export default PersistableTableState;
