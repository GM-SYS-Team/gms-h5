import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';

import {Toast  } from 'antd-mobile';



//销售统计
export const INDEX_ORDER_COUNT = "index/orderCountShow";
export const showSaleCount = (data) => ({
    type: INDEX_ORDER_COUNT,
    data: data
})
export const loadingSaleCount = (params) => {
    return (dispatch) => {
        post("/order/da/countOrder",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showSaleCount(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//设备统计
export const COUNT_DEVICE = "index/countDevice";
export const showDeviceCount = (data) => ({
    type: COUNT_DEVICE,
    data: data
})
export const countDevice = (params) => {
    return (dispatch) => {
        post("/device/da/count",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showDeviceCount(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};

//设备销售排行
export const DEVICE_SALE_LIST = "index/deviceSaleList";
export const showDeviceSaleList = (data) => ({
    type: DEVICE_SALE_LIST,
    data: data
})
export const listSaleOfDevice = (params) => {
    return (dispatch) => {
        post("/order/da/listSaleOfDevice",true,params,(res)=>{
            if(res.code === "600"){
                console.log(res.data);
                dispatch(showDeviceSaleList(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};


//商品销售排行
export const GOODS_SALE_LIST = "index/goodsSaleList";
export const showGoodsSaleList = (data) => ({
    type: GOODS_SALE_LIST,
    data: data
})
export const listSaleOfGoods = (params) => {
    return (dispatch) => {
        post("/goods/da/listSaleOfGoods",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showGoodsSaleList(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};




//销售数据
export const INDEX_SALE_DATA = "index/saleData";
export const showSaleData = (data) => ({
    type: INDEX_SALE_DATA,
    data: data
});
export const loadingSaleData = (params) => {
    return (dispatch) => {
        post("/order/da/listSaleOfDate",true,params,(res)=>{
            if(res.code === "600"){
                dispatch(showSaleData(res.data));
            }else{
                Toast.info(res.msg);
            }
        });
    }
};