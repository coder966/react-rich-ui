import hashCode from '../utils/hashCode';
import PersistableTableState from './types/PersistableTableState';
import TableColumn from './types/TableColumn';

const calculateTablePersistenceId = (requestMethod: string, endpoint: string, columns: TableColumn[]): string => {
  return 'RruPageableTable_State_' + hashCode(JSON.stringify({ requestMethod, endpoint, columns }));
};

const persistTableState = (tableUniqueId: string, state: PersistableTableState) => {
  sessionStorage.setItem(tableUniqueId, JSON.stringify(state));
};

const getPersistedTableState = (tableUniqueId: string): PersistableTableState => {
  const persistedData = sessionStorage.getItem(tableUniqueId);
  return persistedData ? JSON.parse(persistedData) : null;
};

export { calculateTablePersistenceId, persistTableState, getPersistedTableState };
