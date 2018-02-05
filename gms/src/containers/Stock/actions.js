import { browserHistory } from 'react-router'
import {post, uploadImg} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast } from 'antd-mobile';


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
                dispatch(showSupplierList(res.data.rows));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//新增库存
export const addStock = (params) => {
    return (dispatch) => {
        post("/app/jxc/purchase/save",false,params,(res)=>{
            if(res.code === "1"){
                browserHistory.push("/shop/"+params.shopId+"/stock/list")
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};



