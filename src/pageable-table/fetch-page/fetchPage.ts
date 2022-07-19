import fetchPageUsingAxios from "./fetchPageUsingAxios";
import fetchPageUsingFetch from "./fetchPageUsingFetch";
import loadAxios from "./loadAxios";
import { createRequestBody, createRequestParams } from "./rest-api-datasource/spring-datasource";
import RejectFunction from "./types/RejectFunction";
import RequestMethod from "./types/RequestMethod";
import ResolveFunction from "./types/ResolveFunction";
import RruPageableTablePage from "./types/RruPageableTablePage";

/**
 * Creates an abstract promise for different HTTP client libs
 * @returns Promise
 */
const fetchDataSource = (
  requestMethod: RequestMethod,
  endpoint: string,

  currentPage: number,
  pageSize: number,

  search?: any,
  sortBy?: string,
  sortDir?: string
): Promise<RruPageableTablePage> => {

  // prepare request info
  const params = createRequestParams(requestMethod, currentPage, pageSize, search, sortBy, sortDir);
  const body = createRequestBody(requestMethod, currentPage, pageSize, search, sortBy, sortDir);

  return new Promise((resolve: ResolveFunction, reject: RejectFunction) => {
    if (loadAxios()) {
      fetchPageUsingAxios(requestMethod, endpoint, params, body, resolve, reject);
    } else {
      fetchPageUsingFetch(requestMethod, endpoint, params, body, resolve, reject);
    }
  });
};

export default fetchDataSource;
