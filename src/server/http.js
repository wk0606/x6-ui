import axios from 'axios'
import { Message } from 'element-ui'
import { util } from './util'
const BASE_URL = util.API_BASE_URL
// util.getTokenid()
const Http = axios.create({
  timeout: 60 * 1000,
  baseURL: BASE_URL,
  headers: {
    token: '001:pc:48ac1088-7e5b-403b-9402-41e29ad6ca3d'
  }
})
// request拦截器
Http.interceptors.request.use(config => {
  config.method = 'post'
  return config
})

Http.interceptors.response.use(response => {
  if (response.data.result === 'ok') {
    return response.data
  } else if (response.data.result === 'timeout') {
    Message({
      message: '系统token失效，请重新登陆',
      type: 'error'
    })
    return Promise.reject(new Error('timeout'))
  } else {
    Message({
      message: response.data.message,
      type: 'error'
    })
    return Promise.reject(new Error('error'))
  }
}, error => {
  let msg
  if (error.Message !== undefined) {
    msg = `ERROR: ${error.Message}`
  } else if (!!error.response && !!error.response.status) {
    msg = `Http Code: ${error.response.status} ${error.response.statusText}`
  } else if (!!error.toJSON) {
    msg = error.toJSON().message
  } else {
    msg = '未知错误'
  }
  Message({
    message: msg,
    type: 'error'
  })
  return Promise.reject(error)
})

export { Http }
