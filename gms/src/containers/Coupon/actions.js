import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';

//用户优惠券列表
export const index_shop_coupon_list = "index_shop_coupon_list";
export const showShopCouponList = (data) => ({
    type: index_shop_coupon_list,
    data: data
});

export const listCoupon = (params) => {
    return (dispatch) => {
        post("/app/coupon/user/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showShopCouponList(res.data.couponList));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//分享的优惠券
export const index_shared_coupon = "index_shared_coupon";
export const showSharedCoupon = (data) => ({
    type: index_shared_coupon,
    data: data
});

export const getCoupon = (params) => {
    return (dispatch) => {
        post("/app/coupon/user",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showSharedCoupon(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//领取优惠券
export const reciveCoupon = (params,callBack) => {
    return (dispatch) => {
        post("/app/coupon/user/receive",false,params,(res)=>{
            if(res.code === "1"){
                callBack();
            }else{
                Toast.info(res.msg);
            }
        });
    }
};