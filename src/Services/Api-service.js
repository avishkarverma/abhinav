import Axios from 'axios-observable';
import AppConfig from '../AppConfig';
// Add a request interceptor
Axios.interceptors.request.use(function (config) {
  // spinning start to show
  // UPDATE: Add this code to show global loading indicator
  document.body.classList.add('loading-indicator');
  // Do something before request is sent
  config.headers.common['Authorization'] = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : "ddd";

  return config;
}, function (error) {
  document.body.classList.remove('loading-indicator');
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // spinning hide
  // UPDATE: Add this code to hide global loading indicator
  document.body.classList.remove('loading-indicator');
  // Do something with response data
  return response;
}, function (error) {
  document.body.classList.remove('loading-indicator');
  // Do something with response error
  return Promise.reject(error);
});


export default class ApiServices {
  static baseUrl = AppConfig.baseUrl + process.env.REACT_APP_API_ENDPOINT;


 
  static OCRReprocess(obj) {
    const URL = AppConfig.baseUrl + process.env.REACT_APP_API_ENDPOINT + "vidado/reprocess";
    const subcription = Axios.get(URL, obj);
    return subcription;
  }

  static authenticateLogin(LoginObj) {
    return Axios.post(AppConfig.baseUrl + process.env.REACT_APP_API_ENDPOINT + '/vidado/reprocess/login', LoginObj)
  }
}
