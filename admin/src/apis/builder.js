import request from './request'

function replaceUrlParam(url, urlParam = {}) {
  let outUrl = url
  Object.keys(urlParam).forEach((key) => {
    outUrl = outUrl.replace(`:${key}`, urlParam[key])
  })
  return outUrl
}

export default {
  get(url) {
    return (params, { urlParam, config } = {}) =>
      request.get(replaceUrlParam(url, urlParam), { params, ...config })
  },
  post(url) {
    return (body, { urlParam, config } = {}) =>
      request.post(replaceUrlParam(url, urlParam), body, config)
  },
  delete(url) {
    return (body, { urlParam, config } = {}) =>
      request.delete(replaceUrlParam(url, urlParam), body, config)
  },
  put(url) {
    return (body, { urlParam, config } = {}) =>
      request.put(replaceUrlParam(url, urlParam), body, config)
  },
}
