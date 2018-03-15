import * as actions from './actions';
import dealPage from '../../utils/dealPage';
import {index_tuijan_list} from "./actions";

/**
 * 根据actions处理结果返回新的state
 * 此时接收到的state 为当前组件的state
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {
    switch (action.type) {

        //销售统计
        case actions.index_shop_list:{
            return {...state,shopList:action.data}
        }

        //推荐列表
        case actions.index_tuijan_list:{
            return {...state,tuijianList:action.data}
        }

        default:
            return {...state}
    }
}
