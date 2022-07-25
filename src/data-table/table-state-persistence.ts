/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PersistableTableState from './types/PersistableTableState';

const getPersistenceKeyPrefix = (): string => {
  // even though we use sessionStorage, which is per-tab, the user may navigate between pages
  // in the same tab and those pages can have different tables but with the same requestMethod and endpoint
  // this is why we need to prepend the window location pathname
  return `RruDataTable_${window.location.pathname}_`;
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
