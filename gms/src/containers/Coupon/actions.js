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