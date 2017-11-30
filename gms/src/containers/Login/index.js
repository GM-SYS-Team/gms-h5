import * as actions from './actions.js';
import {stateKey} from "./login";

import login from './login.js';
import reg from './reg.js';
import forget from './forget.js';

import {initialState as initialStateLogin } from './login.js';
import {initialState as initialStateReg } from './reg.js';
import {initialState as initialStateForget } from './forget.js';

import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */

const initialState = Object.assign(
    initialStateLogin,
    initialStateReg,
    initialStateForget,
);

export {
    login,
    reg,
    forget,
    actions, reducer, initialState,stateKey};
