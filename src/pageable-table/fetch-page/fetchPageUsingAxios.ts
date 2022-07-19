import loadAxios from "./loadAxios";
import RejectFunction from "./types/RejectFunction";
import RequestMethod from "./types/RequestMethod";
import ResolveFunction from "./types/ResolveFunction";

const axios = loadAxios();

const fetchPageUsingAxios = (
  requestMethod: RequestMethod,
  url: string,
  params: any,
  body: any,
  resolve: ResolveFunction,
  reject: RejectFunction
): void => {

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
