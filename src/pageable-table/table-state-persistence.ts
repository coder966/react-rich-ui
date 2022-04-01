import hashCode from '../utils/hashCode';
import PersistableTableData from './types/PersistableTableData';
import TableColumn from './types/TableColumn';

const calculateTablePersistenceId = (requestMethod: string, endpoint: string, columns: TableColumn[]): string => {
  return 'RruPageableTable_State_' + hashCode(JSON.stringify({ requestMethod, endpoint, columns }));
};

const persistTableState = (tableUniqueId: string, state: PersistableTableData) => {
  sessionStorage.setItem(tableUniqueId, JSON.stringify(state));
};

const getPersistedTableState = (tableUniqueId: string): PersistableTableData => {
  const persistedData = sessionStorage.getItem(tableUniqueId);
  return persistedData ? JSON.parse(persistedData) : null;
};

export { calculateTablePersistenceId, persistTableState, getPersistedTableState };
