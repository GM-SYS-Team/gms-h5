import * as actions from './actions.js';
import {stateKey} from "./coupon";

import draw from './draw.js';
import coupon from './coupon.js';

import {initialState as initialStateDraw } from './draw.js';
import {initialState as initialStatecoupon } from './coupon.js';

import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */

const initialState = Object.assign(
    initialStateDraw,
    initialStatecoupon,
);

export {
    draw,
    coupon,
    actions, reducer, initialState,stateKey};
