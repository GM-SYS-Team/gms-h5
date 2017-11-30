import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast  } from 'antd-mobile';

//登陆
export const ACTION_TYPE_LOGIN = "login/login";

export const login = (values) => {
    //这里可以请求api
    return (dispatch) => {

        post("/dms/home/dologin",false,values,(res)=>{
            if(res.code === "600"){
                localStorage.setItem("userName",res.data.name);
                localStorage.setItem("userType",res.data.userType);
                localStorage.setItem("operatorName",res.data.operatorName);
                localStorage.setItem("operatorCode",res.data.operatorCode);
                localStorage.setItem("operatorId",res.data.operatorId);

                setCookie("userToken",res.data.token,20);

                //记住密码
                if(values.rememberPassword){
                    localStorage.setItem("rememberUserName",values.name);
                    localStorage.setItem("rememberPassword",values.password);
                }else{
                    localStorage.removeItem("rememberUserName");
                    localStorage.removeItem("rememberPassword");
                }

                browserHistory.push("/");
            }else{
                Toast.info(res.msg);
            }
        });
    }
};