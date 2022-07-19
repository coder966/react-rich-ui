
/**
 * dynamically load Axios
 */
const loadAxios = () => {
  let axios: any = null;
  try {
    axios = require('axios');
  } catch (e) {
    console.debug('Axios is not installed. Falling back to fetch');
  }
  return axios;
}

export default loadAxios;
