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
  if( response.status == 401 ){
    this.$message({
      showClose: true,
      message: '登录状态已失效，请重新登陆',
      type: 'error'
    });
    location.hash = '/login'
  }
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
  logout(){
    return request.post('/logout')
  },
  getUsers(){
    return request.get('/users')
  },
  checkLogin(){
    return request.get('/checkLogin')
  },
  deleteUser(data){
    return request.post('/deleteUser',data)
  },
  updateUser(data){
    return request.put('/users',data)
  }
}
