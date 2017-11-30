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

        //订单列表
        case actions.LIST_ORDER:{
            let pager = dealPage(action.data);
            console.log(action.data);
            return {...state,orderList:action.data.list,pager: pager}
        }

        //订单详情
        case actions.ORDER_DETAIL:{
            return {...state,orderDetail:action.data}
        }

        default:
            return {...state}
    }
}
