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

        //门店列表
        case actions.index_shop_list:{
            return {...state,shopList:action.data}
        }

        //门店详情
        case actions.index_shop_detail:{
            return {...state,shopDetail:action.data}
        }

        //门店商品列表
        case actions.index_shop_goods_list:{
            return {...state,shopGoodsList:action.data}
        }

        //门店商品品类列表
        case actions.index_shop_goodstype_list:{
            return {...state,typeList:action.data}
        }

        //门店商品单位列表
        case actions.index_shop_goodsunit_list:{
            return {...state,unitList:action.data}
        }

        //门店优惠券列表
        case actions.index_shop_coupon_list:{
            return {...state,couponList:action.data}
        }

        default:
            return {...state}
    }
}
