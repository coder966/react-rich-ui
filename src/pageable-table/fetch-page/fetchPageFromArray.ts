import RejectFunction from "./types/RejectFunction";
import ResolveFunction from "./types/ResolveFunction";

const fetchPageUsingAxios = (
  data: any[],

  currentPage: number,
  pageSize: number,

  search: object,
  sortBy: string,
  sortDir: string,

  resolve: ResolveFunction,
  reject: RejectFunction
) => {

  const filtered = data.filter(item => {
    for (let key in item) {
      console.log(key);
    }
  });

  const sorted = filtered;

  const requestedPage = sorted;

  resolve({
    totalPages: 1,
    currentPage: 0,
    content: requestedPage,
  });

}

export default fetchPageUsingAxios;
