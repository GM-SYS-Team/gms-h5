import * as actions from './actions.js';
import reducer from './reducer';

import {stateKey} from './customerList.js';

import customerList from './customerList.js';
import customerAddOrEdit from './customerAddOrEdit.js';

import {initialState as initialStatecustomerList} from './customerList.js';
import {initialState as initialStatecustomerAddOrEdit} from './customerAddOrEdit.js';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */
const initialState = Object.assign(
    initialStatecustomerList,
    initialStatecustomerAddOrEdit,
);
export {
    customerList,
    customerAddOrEdit,
    actions, reducer, initialState,stateKey};
