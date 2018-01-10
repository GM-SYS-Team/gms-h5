import { browserHistory } from 'react-router'
import {post} from '../../utils/ajax'
import {getCookie,setCookie} from '../../utils/cookie';
import {Toast} from 'antd-mobile';



//店铺列表
export const index_shop_list = "index_shop_list";
export const showShopList = (data) => ({
    type: index_shop_list,
    data: data
});

export const loadingShopList = (params) => {
    return (dispatch) => {
        post("/app/shop/list",false,params,(res)=>{
            if(res.code === "1"){
                dispatch(showShopList(res.data));
            }else{
                Toast.info(res.msg,1);
            }
        });
    }
};