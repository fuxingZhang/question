import axiosLib from 'axios'

var axios = axiosLib.create({
  baseURL: 'http://dfs-api.ddyxapp.com',
  timeout: 10000,
  validateStatus: function (status) {
    return status < 600; // Reject only if the status code is greater than or equal to 500
  }
})

axios.interceptors.request.use(function(config) {
  let token = localStorage.getItem('yhsd.x-access-token')
  if (token) {
    config.headers.common['x-access-token'] = token;
  }
  return config
})

axios.interceptors.response.use(function (response) {
  if (response.status >= 400 && response.status < 500) {
    response.errorText = response.data.message
  }else if (response.status >= 500) {
    response.errorText = '服务不可用'
  }
  return response;
}, function (error) {
  return Promise.reject(error);
})

export default axios
