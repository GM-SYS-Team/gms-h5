import * as actions from './actions.js';
import reducer from './reducer';

import {stateKey} from './orderList.js';

import orderList from './orderList.js';
import orderAddOrEdit from './orderAddOrEdit.js';

import {initialState as initialStateorderList} from './orderList.js';
import {initialState as initialStateorderAddOrEdit} from './orderAddOrEdit.js';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */
const initialState = Object.assign(
    initialStateorderList,
    initialStateorderAddOrEdit,
);
export {
    orderList,
    orderAddOrEdit,
    actions, reducer, initialState,stateKey};
