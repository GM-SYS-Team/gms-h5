import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';



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