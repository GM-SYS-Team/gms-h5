import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Perf from 'react-addons-perf';
import resetEnhancer from './utils/enhancer/reset.js';

import {stateKey as loginStateKey, reducer as loginReducer, initialState as loginState} from './containers/Login/';
import {stateKey as salesStateKey, reducer as salesReducer, initialState as salesState} from './containers/Index/';
import {stateKey as orderStateKey, reducer as orderReducer, initialState as orderState} from './containers/My/';
import {stateKey as shopStateKey, reducer as shopReducer, initialState as shopState} from './containers/Shop/';
import {stateKey as couponStateKey, reducer as couponReducer, initialState as couponState} from './containers/Coupon/';
import {stateKey as supplierStateKey, reducer as supplierReducer, initialState as supplierState} from './containers/Supplier/';
import {stateKey as customerStateKey, reducer as customerReducer, initialState as customerState} from './containers/Customer/';



/**
 * 注册全局的reducer
 * @type {{routing: undefined}}
 */
const originalReducers = {
    routing: routerReducer,
    [loginStateKey]: loginReducer,
    [salesStateKey]: salesReducer,
    [orderStateKey]: orderReducer,
    [shopStateKey]: shopReducer,
    [couponStateKey]: couponReducer,
    [supplierStateKey]: supplierReducer,
    [customerStateKey]: customerReducer,
};
const reducer = combineReducers(originalReducers);

/**
 * 向store中注册状态树
 * store最重要的一步，就是状态树的设计和维护
 */
const initialState = {
    [loginStateKey]: loginState,
    [salesStateKey]: salesState,
    [orderStateKey]: orderState,
    [shopStateKey]: shopState,
    [couponStateKey]: couponState,
    [supplierStateKey]: supplierState,
    [customerStateKey]: customerState,
};


//设置中间件
const win = window;
win.Perf = Perf;
const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

//设置store增强器
const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

//生成并返回store
const store = createStore(reducer, initialState, storeEnhancers);
store._reducers = originalReducers;
export default store;

