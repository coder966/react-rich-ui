import hashCode from '../utils/hashCode';
import safeStringify from '../utils/safeStringify';
import PersistableTableState from './types/PersistableTableState';
import TableColumn from './types/TableColumn';

const INDEX_STARTS_FROM = 1;
let gCounter: number = INDEX_STARTS_FROM;

interface PersistenceWrapper {
  tableSignature?: number;
  data: PersistableTableState;
}

const getKeyPrefix = (): string => {
  return 'RruPageableTable_State_' + window.location.pathname + '_';
};

const generatePersistenceKey = (requestMethod: string, endpoint: string, columns: TableColumn[]): string => {
  const tableSignature: number = hashCode(safeStringify({ requestMethod, endpoint, columns }));
  const keyPrefix = getKeyPrefix();
  for (let i = INDEX_STARTS_FROM; i < 20; i++) {
    const key: string = keyPrefix + i;
    const item: string | null = sessionStorage.getItem(key);
    const parsedItem: PersistenceWrapper = item ? JSON.parse(item) : null;
    if (parsedItem && parsedItem.tableSignature === tableSignature) {
      return key;
    }
  }
  const key: string = keyPrefix + gCounter;
  sessionStorage.setItem(
    key,
    JSON.stringify({
      tableSignature: tableSignature,
      data: null,
    })
  );
  gCounter++;
  return key;
};

const persistTableState = (persistenceKey: string, state: PersistableTableState) => {
  const item: string | null = sessionStorage.getItem(persistenceKey);
  const parsedItem: PersistenceWrapper = item ? JSON.parse(item) : null;
  sessionStorage.setItem(
    persistenceKey,
    JSON.stringify({
      tableSignature: parsedItem.tableSignature,
      data: state,
    })
  );
};

const getPersistedTableState = (persistenceKey: string): PersistableTableState | undefined => {
  const item: string | null = sessionStorage.getItem(persistenceKey);
  const parsedItem: PersistenceWrapper = item ? JSON.parse(item) : null;
  return parsedItem?.data;
};

const getPersistedTableStateByTableIndex = (tableIndex?: number): PersistableTableState | undefined => {
  return getPersistedTableState(getKeyPrefix() + (tableIndex || INDEX_STARTS_FROM));
};

export { generatePersistenceKey, persistTableState, getPersistedTableState, getPersistedTableStateByTableIndex };
