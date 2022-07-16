import { getFirstPersistedTableState, getPersistedTableState } from "./table-state-persistence";

/**
 * If you don't specify the endpoint it will return the first table data in the current page.
 */
const getRetainedTableSearchObject = (endpoint?: string): { [key: string]: any; } | undefined => {
  if (endpoint) {
    return getPersistedTableState(endpoint)?.search;
  } else {
    return getFirstPersistedTableState()?.search;
  }
}

export default getRetainedTableSearchObject;
