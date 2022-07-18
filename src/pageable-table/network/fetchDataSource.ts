import SpringPage from "../types/SpringPage";
import loadAxios from "./loadAxios";
import { RejectFunction, RequestMethod, ResolveFunction } from "./network-types";
import callUsingAxios from "./resolveUsingAxios";
import callUsingFetch from "./resolveUsingFetch";

/**
 * Creates an abstract promise for different HTTP client libs
 * @returns Promise
 */
const fetchDataSource = (
  requestMethod: RequestMethod,
  endpoint: string,
  currentPage: number,
  pageSize: number,
  search?: object,
  sortBy?: string,
  sortDir?: string
): Promise<SpringPage> => {

  // prepare request info
  const pageable = {
    page: currentPage,
    size: pageSize,
    sort: sortBy ? sortBy + ',' + (sortDir ? sortDir : '') : '',
  };

  let params: object;
  let body: object | undefined;

  if (requestMethod === 'POST') {
    params = pageable;
    body = search;
  } else {
    params = { ...pageable, ...search };
    body = undefined;
  }

  return new Promise((resolve: ResolveFunction, reject: RejectFunction) => {
    if (loadAxios()) {
      callUsingAxios(requestMethod, endpoint, params, body, resolve, reject);
    } else {
      callUsingFetch(requestMethod, endpoint, params, body, resolve, reject);
    }
  });
};

export default fetchDataSource;
