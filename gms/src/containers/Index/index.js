import * as actions from './actions.js';

import view from './view.js';
import youzhuanbei from './youzhuanbei.js';
import shequ from './shequ.js';
import guangdian from './guangdian.js';

import {stateKey} from './view.js';
import {initialState as initialStateIndex} from './view.js';
import {initialState as initialStateYouzhuanbei} from './youzhuanbei.js';
import {initialState as initialStateShequ} from './shequ.js';
import {initialState as initialStateGuangdian} from './guangdian.js';
import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */

const initialState = Object.assign(
    initialStateIndex,
    initialStateYouzhuanbei,
    initialStateShequ,
    initialStateGuangdian,
);

export {
    view,
    youzhuanbei,
    shequ,
    guangdian,
    actions, reducer, initialState,stateKey};
