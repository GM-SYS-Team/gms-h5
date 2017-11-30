import * as actions from './actions.js';

import center from './center.js';
import editUserInfo from './editUserInfo.js';

import {stateKey} from './center.js';

import {initialState as initialStateCenter} from './center.js';
import {initialState as initialStateeditUserInfo} from './editUserInfo.js';

import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */

const initialState = Object.assign(
    initialStateCenter,
    initialStateeditUserInfo,
);

export {
    center,
    editUserInfo,
    actions, reducer, initialState,stateKey};
