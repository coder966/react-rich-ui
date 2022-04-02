import PersistableTableState from './types/PersistableTableState';

const getPersistenceKeyPrefix = (): string => {
  // even though we use sessionStorage, which is per-tab, the user may navigate between pages
  // in the same tab and those pages can have different tables but with the same requestMethod and endpoint
  // this is why we need to prepend the window location pathname
  return `RruPageableTable_${window.location.pathname}_`;
};

const getPersistenceKey = (endpoint: string): string => {
  return `${getPersistenceKeyPrefix()}_${endpoint}`;
};

const persistTableState = (endpoint: string, state: PersistableTableState) => {
  const key = getPersistenceKey(endpoint);
  sessionStorage.setItem(key, JSON.stringify(state));
};

const getPersistedTableState = (endpoint: string): PersistableTableState | undefined => {
  const key = getPersistenceKey(endpoint);
  const item: string | null = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const getFirstPersistedTableState = (): PersistableTableState | undefined => {
  const keys = Object.keys(sessionStorage).filter(key => key.startsWith(getPersistenceKeyPrefix()));
  const item: string | null = sessionStorage.getItem(keys[0]);
  return item ? JSON.parse(item) : null;
};

export { persistTableState, getPersistedTableState, getFirstPersistedTableState };
