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
    if(typeof params === "undefined"){
        params = {};
    }
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

//上传图片
export const uploadImg = (url,file,fileType,callBack) => {
    //上传配置
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }

    let param = new FormData();  // 创建form对象
    param.append('pictureFile', file, file.name);  // 通过append向form对象添加数据
    param.append('chunk', '0'); // 添加form表单中其他数据
    param.append('access_token', localStorage.getItem("userToken"));//用户鉴权
    param.append('fileType',fileType);

    axios.post("/app/user/picture/upload",param,config).then(function (res) {
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

