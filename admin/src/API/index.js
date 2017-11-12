import axios from 'axios'

const Util = {
  host: 'http://localhost:3000/api/'
}

const request = axios.create({
  baseURL: Util.host,
  validateStatus: function (status) {
    return status < 600; // Reject only if the status code is greater than or equal to 500
  }
})

request.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  login(data){
    return request.post('/login',data)
  },
  register(data){
    return request.post('/register',data)
  },
  test(){
    return request.get('/paper')
  }
}
