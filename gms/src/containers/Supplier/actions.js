import { browserHistory } from 'react-router'
import {post, uploadImg} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';


//供应商列表
export const supplier_list = "supplier_list";
export const showSupplierList = (data) => ({
    type: supplier_list,
    data: data
});
export const listSupplier = (params) => {
    return (dispatch) => {
        post("/app/jxc/supplier/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showSupplierList(res.data));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//供应商新增
export const addSupplier = (params) => {
    return (dispatch) => {
        post("/app/jxc/supplier/save",false,params,(res)=>{
            if(res.code === "1"){
                browserHistory.push("/shop/"+params.shopId+"/supplier/list")
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};


//店铺详情
export const index_shop_detail = "index_shop_detail";
export const showShopDetail = (data) => ({
    type: index_shop_detail,
    data: data
});

export const getShopDetail = (params) => {
    return (dispatch) => {
        post("/app/shop/query",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showShopDetail(res.data));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};


//店铺商品列表
export const index_shop_goods_list = "index_shop_goods_list";
export const showShopGoodsList = (data) => ({
    type: index_shop_goods_list,
    data: data
});

export const listShopGoods = (params) => {
    return (dispatch) => {
        post("/app/goods/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showShopGoodsList(res.data.rows));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//店铺商品添加
export const shopGoodsAdd = (params) => {
    return (dispatch) => {
        post("/app/goods/save",false,params,(res)=>{
            if(res.code === "1"){
                window.history.back();
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//上传商品图片
export const uploadGoodsImg = (file,callBack) => {
    return (dispatch) => {
        //2是商品
        uploadImg("/app/user/picture/upload",file,2,(res)=>{
            if(res.code === "1"){
                callBack(res.msg);
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};



//店铺商品添删除
export const delShopGoods = (params,callBack) => {
    return (dispatch) => {
        post("/app/goods/delete",false,params,(res)=>{
            if(res.code === "1"){
                callBack();
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//店铺优惠券列表
export const index_shop_coupon_list = "index_shop_coupon_list";
export const showShopCouponList = (data) => ({
    type: index_shop_coupon_list,
    data: data
});

export const listCoupon = (params) => {
    return (dispatch) => {
        post("/app/coupon/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showShopCouponList(res.data.couponList));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//优惠券添加
export const couponAdd = (params) => {
    return (dispatch) => {
        post("/app/coupon/save",false,params,(res)=>{
            if(res.code === "1"){
                window.history.back();
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};


//优惠券分享
export const shareCoupon = (params) => {
    return (dispatch) => {
        post("/app/coupon/shareCoupon",false,params,(res)=>{
            if(res.code === "1"){
                Toast.info("共享成功");
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};