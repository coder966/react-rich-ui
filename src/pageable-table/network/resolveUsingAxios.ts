import loadAxios from "./loadAxios";
import { RejectFunction, RequestMethod, ResolveFunction } from "./network-types";

const axios = loadAxios();

const callUsingAxios = (
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

export default callUsingAxios;
