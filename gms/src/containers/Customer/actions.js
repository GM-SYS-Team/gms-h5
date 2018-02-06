import { browserHistory } from 'react-router'
import {post, uploadImg} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';


//客户列表
export const customer_list = "customer_list";
export const showCustomerList = (data) => ({
    type: customer_list,
    data: data
});
export const listCustomer = (params) => {
    return (dispatch) => {
        post("/app/jxc/customer/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showCustomerList(res.data));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//客户新增
export const addCustomer = (params) => {
    return (dispatch) => {
        post("/app/jxc/customer/save",false,params,(res)=>{
            if(res.code === "1"){
                //browserHistory.push("/shop/"+params.shopId+"/customer/list")
                window.history.back();
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//客户编辑
export const editCustomer = (params) => {
    return (dispatch) => {
        post("/app/jxc/customer/modify",false,params,(res)=>{
            if(res.code === "1"){
                browserHistory.push("/shop/"+params.shopId+"/customer/list")
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//客户删除
export const delCustomer = (params) => {
    return (dispatch) => {
        post("/app/jxc/customer/delete",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(listCustomer(params));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};