import * as actions from './actions';
import dealPage from '../../utils/dealPage';

/**
 * 根据actions处理结果返回新的state
 * 此时接收到的state 为当前组件的state
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {
    switch (action.type) {

        //供应商列表
        case actions.supplier_list:{
            return {...state,supplierList:action.data}
        }



        //门店详情
        case actions.index_shop_detail:{
            return {...state,shopDetail:action.data}
        }

        //门店商品列表
        case actions.index_shop_goods_list:{
            return {...state,shopGoodsList:action.data}
        }

        //门店优惠券列表
        case actions.index_shop_coupon_list:{
            return {...state,couponList:action.data}
        }

        default:
            return {...state}
    }
}
