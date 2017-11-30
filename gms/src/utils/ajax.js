import axios from 'axios';
import qs from 'qs';
import {API_URL} from '../config'
import { browserHistory } from 'react-router'


/**
 * ajax请求基本配置
 * @type {number}
 */
// 超时时间
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials=true;
axios.defaults.timeout = 30000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//TODO 请求过滤器
// 添加请求拦截器
var requestInterceptor = axios.interceptors.request.use(config=>{
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
var responseInterceptor = axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.request.eject(responseInterceptor);

/**
 * 去请求方法，增删改查
 * @param url
 * @param params
 * @param callBack
 */
export const get = (url,params,callBack) => {
    axios.get(url,qs.stringify(params)).then(function (res) {
        callBack(res.data);
    }).catch(function (err) {
        console.error(url+"请求失败");
        console.error(err);
    })
}

export const post = (url,isJSON,params,callBack) => {
    console.log(localStorage.getItem("userToken"));
    params.access_token = localStorage.getItem("userToken")
    if(!isJSON){
        params = qs.stringify(params);
    }
    axios.post(url,params).then(function (res) {
        if(res.data.code === 2){
            browserHistory.push("/login")
        }else{
            callBack(res.data);
        }
    }).catch(function (err) {
        console.error(url+"请求失败");
        console.error(err);
    })
}

export const put = (url,params,callBack) => {
    axios.put(url,params).then(function (res) {
        callBack(res.data);
    }).catch(function (err) {
        console.error(url+"请求失败");
        console.error(err);
    })
}

export const del = (url,params,callBack) => {
    axios.delete(url,params).then(function (res) {
        callBack(res.data);
    }).catch(function (err) {
        console.error(url+"请求失败");
        console.error(err);
    })
}
