// 定义网络请求API地址
const baseURL = "https://api.demo.com";

// 封装网络请求开始
interface HttpRequest<T extends APIReqBase> {
  url: string,
  data?: T,
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT',
  hideNetErrorToast?: boolean
}

const _http = <TReq extends APIReqBase, TResp extends APIRespDataBase>({url,data,method,hideNetErrorToast,...other}: HttpRequest<TReq>): Promise<APIResp<TResp>> => {
  // 添加请求加载等待
  wx.showLoading({
    title: '加载中...'
  })
  // Promise封装处理
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求地址拼接
      url: getUrl(url),
      data: data,
      // 获取请求头配置
      header: getHeader(),
      method: method,
      ...other,
      // 成功或失败处理
      success: (res) => {
        wx.hideLoading()
        const resp = res as APIResp<TResp>;
        // 进行状态码判断并处理
        if(resp.statusCode === 200){
          resolve(resp)
        } else {
          reject(resp)
        }
      },
      fail: (res) => {
        wx.hideLoading()
        if (!hideNetErrorToast) {
          wx.showToast({
            title: "网络错误，请稍后再试",
            icon: "none",
            duration: 3000
          })
        }
        reject(res);
      },
    })
  })
}

const getHeader = () => {
  // 获取token并设置请求头
  const token = wx.getStorageSync('userToken')
  let auth = {
      'Authorization': token
  }
  return auth
}

// 进行url字符串拼接
const getUrl = (url: string) => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}

export const apiGet = <TReq extends APIReqBase, TResp extends APIRespDataBase>(url: string, params: TReq, hideNetErrorToast=false) => {
  return _http<TReq, TResp>({
    url,
    data: params,
    hideNetErrorToast,
  })
}

export const apiPost = <TReq extends APIReqBase, TResp extends APIRespDataBase>(url: string, params: TReq, hideNetErrorToast=false) => {
  return _http<TReq, TResp>({
    url,
    data: params,
    method: "POST",
    hideNetErrorToast,
  })
}

export const apiPut = <TReq extends APIReqBase, TResp extends APIRespDataBase>(url: string, params: TReq, hideNetErrorToast=false) => {
  return _http<TReq, TResp>({
    url,
    data: params,
    method: "PUT",
    hideNetErrorToast,
  })
}

export const apiDelete = <TReq extends APIReqBase, TResp extends APIRespDataBase>(url: string, params: TReq, hideNetErrorToast=false) => {
  return _http<TReq, TResp>({
    url,
    data: params,
    method: "DELETE",
    hideNetErrorToast,
  })
}
