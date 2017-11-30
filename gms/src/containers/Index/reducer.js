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

        //销售统计
        case actions.INDEX_ORDER_COUNT:{
            return {...state,saleCount:action.data}
        }

        //设备统计
        case actions.COUNT_DEVICE:{
            return {...state,deviceCount:action.data}
        }

        //设备销售排行
        case actions.DEVICE_SALE_LIST:{
            if(typeof action.data.pageSize !== "undefined"){
                let pager = dealPage(action.data);
                return {...state,deviceSaleList:action.data.list,pager: pager}
            }else{
                return {...state,deviceSaleList:action.data}
            }

        }

        //商品销售排行
        case actions.GOODS_SALE_LIST:{
            return {...state,goodsSaleList:action.data}
        }

        //销售数据
        case actions.INDEX_SALE_DATA:{
            return {...state,saleData:action.data}
        }

        default:
            return {...state}
    }
}
