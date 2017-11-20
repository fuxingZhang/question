import axios from 'axios'

const Util = {
  host: 'http://localhost:3000/api/'
  // host: 'http://39.106.25.139:3000/api/'
}

const request = axios.create({
  baseURL: Util.host
})

request.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  get(id){
    return request.get('/answer/'+id)
  },
  submit(id,data){
    return request.post('/answer/'+id, data)
  },
}
