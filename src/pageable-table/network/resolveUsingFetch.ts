import { RejectFunction, RequestMethod, ResolveFunction } from "./network-types";

const callUsingFetch = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
  resolve: ResolveFunction,
  reject: RejectFunction
) => {

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

export default callUsingFetch;
