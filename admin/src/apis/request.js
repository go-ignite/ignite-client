import axios from 'axios'
import { Notification } from 'element-ui'

const $http = axios.create({
  timeout: 3 * 60 * 1000, // 3 minutes
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

$http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ignite_admin_token')
    if (token) {
      Object.defineProperty(config.headers, 'Authorization', {
        value: token,
        configurable: true,
        enumerable: true,
        writable: true,
      })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

$http.interceptors.response.use(
  (response) => {
    if (response.config.manualHandle) {
      return response.data;
    }

    const {data, success, message} = response.data;
    if (success === false) {
      Notification.error({
        title: '错误',
        message,
      })
      return Promise.reject(message);
    }
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('ignite_admin_token')
      location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default $http
