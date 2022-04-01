import { isObjKey } from '../utils/utilFunction';
import SpringPage from './types/SpringPage';

// dynamically load Axios
let axios: any;
try {
  axios = require('axios');
} catch (e) {
  console.debug('Axios is not installed. Falling back to fetch');
}

/**
 * Creates an abstract promise for different HTTP client libs
 * @returns Promise
 */
const getApiResultPromise = (
  requestMethod: string,
  endpoint: string,
  currentPage: number,
  pageSize: number,
  search?: object,
  sortBy?: string,
  sortDir?: string
) => {

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

  return new Promise((resolve: (data: SpringPage) => void, reject) => {
    if (axios) {
      axios({
        method: requestMethod,
        url: endpoint,
        params: params,
        data: body,
      })
        .then((res: any) => resolve(res.data))
        .catch((err: any) => reject(err));
    } else {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (isObjKey(params, key)) {
          searchParams.append(key, params[key] + '');
        }
      });
      const requestOptions = {
        method: requestMethod,
        body: JSON.stringify(body),
      };
      fetch(endpoint + '?' + searchParams, requestOptions)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }
  });
};

export { getApiResultPromise };
