import * as actions from './actions.js';
import reducer from './reducer';

import {stateKey} from './stockList.js';

import stockList from './stockList.js';
import stockAddOrEdit from './stockAddOrEdit.js';

import {initialState as initialStatestockList} from './stockList.js';
import {initialState as initialStatestockOrEdit} from './stockAddOrEdit.js';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */
const initialState = Object.assign(
    initialStatestockList,
    initialStatestockOrEdit,
);
export {
    stockList,
    stockAddOrEdit,
    actions, reducer, initialState,stateKey};
