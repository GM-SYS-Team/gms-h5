import * as actions from './actions';

/**
 * 根据actions处理结果返回新的state
 * 此时接收到的state 为当前组件的state
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {
    switch (action.type) {

        //门店优惠券列表
        case actions.index_shop_coupon_list:{
            return {...state,couponList:action.data}
        }

        //分享的优惠券
        case actions.index_shared_coupon:{
            return {...state,couponData:action.data}
        }

        default:
            return {...state}
    }
}
