import RejectFunction from "./types/RejectFunction";
import RequestMethod from "./types/RequestMethod";
import ResolveFunction from "./types/ResolveFunction";

const fetchPageUsingFetch = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
  resolve: ResolveFunction,
  reject: RejectFunction
): void => {

  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key] + ''));

  const requestOptions = {
    method: requestMethod,
    body: JSON.stringify(body),
  };

  fetch(url + '?' + searchParams, requestOptions)
    .then((res) => res.json())
    .then((data) => resolve(data))
    .catch((err) => reject(err));

}

export default fetchPageUsingFetch;
