import { RejectFunction, RequestMethod, ResolveFunction } from "./fetch-page-types";
import loadAxios from "./loadAxios";

const axios = loadAxios();

const fetchPageUsingAxios = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
  resolve: ResolveFunction,
  reject: RejectFunction
) => {

  axios({
    method: requestMethod,
    url: url,
    params: params,
    data: body,
  })
    .then((res: any) => resolve(res.data))
    .catch((err: any) => reject(err));

}

export default fetchPageUsingAxios;
