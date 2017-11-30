import * as actions from './actions.js';

import manager from './manager.js';
import add from './shopAdd.js';
import detail from './shopDetail.js';
import goods from './goods.js';
import goodsAdd from './goodsAdd.js';
import coupon from './coupon.js';
import couponAdd from './couponAdd.js';

import {stateKey} from './manager.js';

import {initialState as initialStatemanager} from './manager.js';
import {initialState as initialStateadd} from './shopAdd.js';
import {initialState as initialStatedetail} from './shopDetail.js';
import {initialState as initialStategoods} from './goods.js';
import {initialState as initialStategoodsAdd} from './goodsAdd.js';
import {initialState as initialStatecoupon} from './coupon.js';
import {initialState as initialStatecouponAdd} from './couponAdd.js';


import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */

const initialState = Object.assign(
    initialStatemanager,
    initialStateadd,
    initialStatedetail,
    initialStategoods,
    initialStategoodsAdd,
    initialStatecoupon,
    initialStatecouponAdd,
);

export {
    manager,
    add,
    detail,
    goods,
    goodsAdd,
    coupon,
    couponAdd,
    actions, reducer, initialState,stateKey};
