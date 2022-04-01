import { isObjKey } from "./utilFunction";

const resolveObjectAttribute = (path: string, obj: object): any => {
  return path
    .split('.')
    .reduce((prev: object | null, curr: string) => (prev && isObjKey(prev, curr) ? prev[curr] : null), obj);
};

export default resolveObjectAttribute;
