import * as actions from './actions.js';
import reducer from './reducer';

import {stateKey} from './supplierList.js';

import supplierList from './supplierList.js';
import supplierAddOrEdit from './supplierAddOrEdit.js';

import {initialState as initialStatesupplierList} from './supplierList.js';
import {initialState as initialStatesupplierAddOrEdit} from './supplierAddOrEdit.js';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */
const initialState = Object.assign(
    initialStatesupplierList,
    initialStatesupplierAddOrEdit,
);
export {
    supplierList,
    supplierAddOrEdit,
    actions, reducer, initialState,stateKey};
