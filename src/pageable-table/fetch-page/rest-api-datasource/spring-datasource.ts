import RequestMethod from "../types/RequestMethod";

const createRequestParams = (
  requestMethod: RequestMethod,
  currentPage: number,
  pageSize: number,
  search: any,
  sortBy: string | undefined,
  sortDir: string | undefined
): object => {

  let params = {
    page: currentPage,
    size: pageSize,
    sort: sortBy ? sortBy + ',' + (sortDir ? sortDir : '') : '',
  };

  if (requestMethod === 'GET') {
    params = { ...search, ...params };
  }

  return params;
}

const createRequestBody = (
  requestMethod: RequestMethod,
  currentPage: number,
  pageSize: number,
  search: any,
  sortBy: string | undefined,
  sortDir: string | undefined
): object => {

  let body = {};

  if (requestMethod === 'POST') {
    body = { ...search };
  }

  return body;
}

export { createRequestParams, createRequestBody };

