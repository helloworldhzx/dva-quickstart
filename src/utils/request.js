// // import fetch from 'dva/fetch';
// //
// // function parseJSON(response) {
// //   return response.json();
// // }
// //
// // function checkStatus(response) {
// //   if (response.status >= 200 && response.status < 300) {
// //     return response;
// //   }
// //
// //   const error = new Error(response.statusText);
// //   error.response = response;
// //   throw error;
// // }
// //
// // /**
// //  * Requests a URL, returning a promise.
// //  *
// //  * @param  {string} url       The URL we want to request
// //  * @param  {object} [options] The options we want to pass to "fetch"
// //  * @return {object}           An object containing either "data" or "err"
// //  */
// // export default function request(url, options) {
// //   return fetch(url, options)
// //     .then(checkStatus)
// //     .then(parseJSON)
// //     .then(data => ({ data }))
// //     .catch(err => ({ err }));
// // }
// import fetch from 'dva/fetch';
//
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//
//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }
//
// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// export default async function request(url, options) {
//   const response = await fetch(url, options);
//
//   checkStatus(response);
//
//   const data = await response.json();
//
//   const ret = {
//     data,
//     headers: {},
//   };
//
//   if (response.headers.get('x-total-count')) {
//     ret.headers['x-total-count'] = response.headers.get('x-total-count');
//   }
//
//   return ret;
// }
import fetch from 'dva/fetch';
import axios from 'axios';
import Constant from './constant';
import {
  getSession,
  getLocalStore
} from './sessionStore';
import {message} from 'antd';
import fileSaver from 'file-saver';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

//获得token
function getToken() {
  const loginInfo = getSession(Constant.systemUser) || getLocalStore(Constant.systemUser);
  if (loginInfo && loginInfo.token) {
    return loginInfo.token;
  }
  return undefined;
}

//获得companyID
function getCompanyId() {
  const loginInfo = getSession(Constant.systemUser) || getLocalStore(Constant.systemUser);
  if (loginInfo && loginInfo.userInfo && loginInfo.userInfo.companyId) {
    return loginInfo.userInfo.companyId;
  }
  return undefined;
}

//获得PageId
function getCurrentPageId() {
  const pageInfo = getSession(Constant.systemPage) || getLocalStore(Constant.systemPage);
  if (pageInfo && pageInfo.currentPageId) {
    return pageInfo.currentPageId;
  }
  return 0;
}

//共通请求头部
function requestHeader(opt) {
  let myHeaders = opt.headers;
  if (!myHeaders) {
    myHeaders = {};
  }
  myHeaders['authorization'] = 'Bearer ' + getToken();
  myHeaders['x-pagination-size'] = opt.pageSize ? opt.pageSize : Constant.pageSize;
  myHeaders['x-company-id'] = 2;
  myHeaders['x-page-id'] = opt.pageId ? opt.pageId : getCurrentPageId();
  myHeaders['x-pagination-index'] = opt.pageIndex ? opt.pageIndex - 1 : undefined;
  myHeaders['x-user-role-id'] = opt.userRoleId ? opt.userRoleId : undefined;
  myHeaders['Content-Type'] = 'application/json;charset=UTF-8';
  return myHeaders;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(options) {
  return axios({
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.urlParam,
    headers: requestHeader(options)
  })
    .then(checkStatus)
    .then(res => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else {
        if (res.data && res.data.code && res.data.code < 0) {
          message.error(res.data.message);
          return undefined;
        }
        return res.data;
      }
    })
    .catch(err => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: false}
      } else if (err.response.data && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error('系统繁忙，请联系管理员');
      }
    });
}

/**
 * 文件下载
 *
 */
export function download(options) {
  let headers = requestHeader(options);
  headers['Accept'] = 'application/octet-stream';
  return axios({
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.urlParam,
    headers: headers,
    responseType: options.responseType ? options.responseType : 'blob',
    onDownloadProgress: options.onDownloadProgress
  })
    .then(checkStatus)
    .then(res => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else {
        if (res.data && res.data.code && res.data.code < 0) {
          message.error(res.data.message);
          return undefined;
        }

        //做成下载文件并下载
        let blob = res.data;
        let contentDisposition = res.headers['content-disposition'];
        let filename = decodeURI(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)[1]);
        fileSaver.saveAs(blob, filename);
      }
    })
    .catch(err => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: false}
      } else if (err.response.data && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error('系统繁忙，请联系管理员');
      }
    });
}
/**
 * 月报文件下载
 *
 */
export function monthDownload(options) {
  let headers = requestHeader(options);
  headers['Accept'] = 'application/octet-stream';
  return axios({
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.urlParam,
    headers: headers,
    responseType: options.responseType ? options.responseType : 'blob',
    onDownloadProgress: options.onDownloadProgress
  })
    .then(checkStatus)
    .then(res => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else {
        if (res.data && res.data.code && res.data.code < 0) {
          message.error(res.data.message);
          return undefined;
        }

        //做成下载文件并下载
        let blob = res.data;
        let contentDisposition = res.headers['content-disposition'];
        let filename = decodeURI(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)[1]);
        fileSaver.saveAs(blob, filename);
        return res.headers
      }
    })
    .catch(err => {
      if (options.method.toUpperCase() === 'HEAD') {
        return {success: false}
      } else if (err.response.data && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error('系统繁忙，请联系管理员');
      }
    });
}
