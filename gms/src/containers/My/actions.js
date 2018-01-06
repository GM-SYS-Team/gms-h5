import { browserHistory } from 'react-router'
import {post, uploadImg} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';






//修改昵称
export const modifyNickName = (params,callBack) => {
    return (dispatch) => {
        post("/app/user/modifyNickName",false,params,(res)=>{
            if(res.code === "1"){
                Toast.info("修改成功");
                localStorage.setItem("nickName",params.nickName);
                callBack();
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//修改头像
export const changeHeadImg = (file,callBack) => {
    return (dispatch) => {
        uploadImg("/app/user/picture/upload",file,1,(res)=>{
            if(res.code === "1"){
                callBack(res.msg);
            }else{
                Toast.info(res.msg);
            }
        });
    }
};










//订单列表
export const LIST_ORDER = "order/listOrder";
export const showOrderList = (data) => ({
    type: LIST_ORDER,
    data: data
})
export const listOrder = (params) => {
    return (dispatch) => {
        post("/order/listOrderQueryVO",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showOrderList(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//订单详情
export const ORDER_DETAIL = "order/orderDetail";
export const showOrderDetail = (data) => ({
    type: ORDER_DETAIL,
    data: data
})
export const getOrderById = (params) => {
    return (dispatch) => {
        post("/order/getOrderVOById",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showOrderDetail(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};