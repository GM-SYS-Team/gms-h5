import * as actions from './actions';
import dealPage from '../../utils/dealPage';
import {order_detail} from "./actions";

/**
 * 根据actions处理结果返回新的state
 * 此时接收到的state 为当前组件的state
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {
    switch (action.type) {

        //门店订单列表
        case actions.index_shop_order_list:{
            return {...state,shopOrderList:action.data}
        }

        //门店商品列表
        case actions.index_shop_goods_list:{
            return {...state,shopGoodsList:action.data}
        }
        //订单详情
        case actions.order_detail:{
            return {...state,orderDetail:action.data}
        }


        //供应商列表
        case actions.supplier_list:{
            return {...state,supplierList:action.data}
        }

        default:
            return {...state}
    }
}
