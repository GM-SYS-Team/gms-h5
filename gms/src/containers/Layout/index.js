import * as actions from './actions.js';
import view from './view.js';
import {stateKey,initialState} from './view.js';
import reducer from './reducer';

/**
 * 组件出口文件
 * @return view 页面文件
 * @return actions 组件行为
 * @return totalReducer 组件使用的所有reducer文件
 * @return initialState 组件的初始化状态
 */
export {view, actions, reducer, initialState,stateKey};
