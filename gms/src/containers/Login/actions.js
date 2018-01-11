import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast  } from 'antd-mobile';

//登陆
export const ACTION_TYPE_LOGIN = "login/login";

export const login = (values) => {
    //这里可以请求api
    return (dispatch) => {

        var url = "/app/user/customer/login";
        if(values.userType === 1){
            url = "/app/user/login";
        }

        post(url,false,values,(res)=>{
            if(res.code === "1"){
                localStorage.setItem("nickName",res.data.nickName);
                localStorage.setItem("phoneNum",res.data.phoneNum);
                localStorage.setItem("userType",res.data.userType);
                localStorage.setItem("imgUrl",res.data.imgUrl);
                localStorage.setItem("userToken",res.data.uuid);

                setCookie("userToken",res.data.uuid,20);

                let lastPath = localStorage.getItem("lastPath");
                if(typeof lastPath !== "undefined" && lastPath !== null){
                    browserHistory.push(lastPath);
                }else{
                    browserHistory.push("/");
                }

            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//发送验证码
export const sendVerifyCode = (params) => {
    return (dispatch) => {
        post("/app/user/sendSmsCode",false,params,(res)=>{
            if(res.code === "1"){
                Toast.info("发送成功",1);
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//注册
export const reg = (params) => {
    let url = "";
    //个人注册
    if(params.userType === 0){
        url = "/app/user/customer/register";
    }
    //商家注册
    if(params.userType === 1){
        url = "/app/user/shoper/register";
    }

    return (dispatch) => {
        post(url,false,params,(res)=>{
            if( res.code === "1"){
                Toast.info("注册成功",1,() =>{
                    // browserHistory.push("/login");
                    //跳转到xx页面
                    browserHistory.push("/iframe");

                });
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//注册
export const regBus = (params) => {
    return (dispatch) => {
        post("/app/user/beShoper",false,params,(res)=>{
            if( res.code === "1"){
                Toast.info("注册商家成功",1,() =>{
                    localStorage.setItem("userType","1");
                    browserHistory.push("/");
                });
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};


//忘记密码
export const forgetPassword = (params) => {

    return (dispatch) => {
        post("/app/user/forgetPassword",false,params,(res)=>{
            if(res.code === "1"){
                Toast.info("密码重置成功",3,() =>{
                    browserHistory.push("/login");
                });
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

