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

//供应商编辑
export const editSupplier = (params) => {
    return (dispatch) => {
        post("/app/jxc/supplier/modify",false,params,(res)=>{
            if(res.code === "1"){
                browserHistory.push("/shop/"+params.shopId+"/supplier/list")
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};

//供应商删除
export const delSupplier = (params) => {
    return (dispatch) => {
        post("/app/jxc/supplier/delete",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(listSupplier(params));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};


