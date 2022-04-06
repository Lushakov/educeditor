import axios from "axios";
import {BASE_API_URL, Path} from './const-path'
import Router from "next/router";
import Cookies from 'js-cookie';
// import FingerprintJS from '@fingerprintjs/fingerprintjs'



// if (process.browser) {
//   if (!Cookies.get(`Fingerprint`)) {
//     // Initialize an agent at application startup.
//     const fpPromise = FingerprintJS.load();

//     ; (async () => {
//       // Get the visitor identifier when you need it.
//       const fp = await fpPromise;
//       const result = await fp.get();

//       // This is the visitor identifier:
//       Cookies.set('Fingerprint', result.visitorId);
//     })()
//   }
// }


const BACKEND_URL = BASE_API_URL;
const REQUEST_TIMEOUT = 60000;

const HttpCode = {
  UNAUTHORIZED: 401
};


const onUnauthorized = () => {
  console.log('redirect ok')
  Router.push(Path.LOGIN)
  Cookies.remove('sessionKey')
}

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
    // baseURL: `http://localhost:8085/api`
    baseURL: `http://45.135.134.152:8086/api`
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    const {response} = err;
    console.log('response.status', response.status)
    if (response.status === HttpCode.UNAUTHORIZED) {onUnauthorized()}
    throw err;
  };
  api.interceptors.response.use(onSuccess, onFail);


  const requestHandler = request => {
    request.headers['Authorization'] = Cookies.get('sessionKey')
    request.headers['Fingerprint'] = Cookies.get('Fingerprint')
    return request;
  }
  api.interceptors.request.use(request => requestHandler(request));


  return api;
};

export const API = createAPI(onUnauthorized)
