import axios from 'axios';
  /**
   * Function to attach token to header
   *
   * @param {object} token
   * @returns {object} token
   */
const attachAuthToken = (token) => {
  const injector = axios.create();
  const defaultHeaders = injector.defaults.headers.common || {};

  if (token) {
    defaultHeaders['x-access-token'] = token;
  } else {
    delete defaultHeaders['x-access-token'];
  }

  return injector;
};

export default attachAuthToken;
