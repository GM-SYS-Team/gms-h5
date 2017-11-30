import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './Store.js';
import {syncHistoryWithStore} from 'react-router-redux';
import {getCookie,setCookie,resetCookieExpireDate} from './utils/cookie';
import "./styles/base.less";

//框架页面
const getLayoutPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Layout/index').view);
    }, 'layout');
};

/**
 * 登陆注册
 * @param nextState
 * @param callback
 */
//登陆页面
const getLoginPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Login/index').login);
    }, 'login');
};

//注册
const getRegPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Login/index').reg);
    }, 'reg');
};

//忘记密码
const getForgetPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Login/index').forget);
    }, 'forget');
};




/**
 * 首页
 * @param nextState
 * @param callback
 */
//首页
const getIndexPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Index/index').view);
    }, 'view');
};
const getYouzhuanbeiPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Index/index').youzhuanbei);
    }, 'youzhuanbei');
};




/**
 * 个人中心
 * @param nextState
 * @param callback
 */
//个人中心
const getCenterPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/My/index').center);
    }, 'center');
};
//修改个人信息
const getEditUserInfoPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/My/index').editUserInfo);
    }, 'editUserInfo');
};


/**
 * 优惠券
 */
//领取优惠券
const getDrawPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Coupon/index').draw);
    }, 'draw');
};
const getCouponPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Coupon/index').coupon);
    }, 'coupon');
};



/**
 *  店铺
 */
const getManagerPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').manager);
    }, 'manager');
};
const getShopAddPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').add);
    }, 'shopAdd');
};
const getShopDetailPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').detail);
    }, 'shopDetail');
};
//店铺商品列表
const getShopgoodsPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').goods);
    }, 'shopgoods');
};
//店铺商品
const getShopgoodsAddPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').goodsAdd);
    }, 'shopgoodsAdd');
};

//优惠券
const getShopcouponPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').coupon);
    }, 'shopcoupon');
};
const getShopcouponAddPage = (nextState, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./containers/Shop/index').couponAdd);
    }, 'shopcouponAdd');
};




/**
 * 登陆状态判断用户
 * @param nextState
 * @param replace
 */
const isLogin = (nextState, replace) => {
    const userToken = getCookie("userToken");

    //使用
    if(typeof userToken === "undefined" || userToken === null){
        replace("/login");
    }else {
        resetCookieExpireDate("userToken",20);
    }
}




/**
 * 统一路由定义
 * createElement创造元素，传递store
 * @constructor
 */
const createElement = (Component, props) => {
    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
};

const history = syncHistoryWithStore(browserHistory, store);
const Routes = () => (
    <Router history={history} createElement={createElement}>

        <Route path="/login" getComponent={getLoginPage}></Route>
        <Route path="/reg" getComponent={getRegPage}></Route>
        <Route path="/forget" getComponent={getForgetPage}></Route>

        <Route path="/" onEnter={isLogin}>
            <IndexRoute getComponent={getLayoutPage} />

            <Route path="/index" getComponent={getIndexPage} />
            <Route path="/youzhuanbei" getComponent={getYouzhuanbeiPage} />

            <Route path="/my" getComponent={getCenterPage} />
            <Route path="/editUserInfo" getComponent={getEditUserInfoPage} />

            <Route path="/draw" getComponent={getDrawPage} />
            <Route path="/my/coupon" getComponent={getCouponPage} />


            <Route path="/shop/manager" getComponent={getManagerPage} />
            <Route path="/shop/add" getComponent={getShopAddPage} />
            <Route path="/shop/detail/:id" getComponent={getShopDetailPage} />
            <Route path="/shop/:id/goods" getComponent={getShopgoodsPage} />
            <Route path="/shop/:id/goodsAdd" getComponent={getShopgoodsAddPage} />
            <Route path="/shop/:id/coupon" getComponent={getShopcouponPage} />
            <Route path="/shop/:id/couponAdd" getComponent={getShopcouponAddPage} />

        </Route>

    </Router>
);
export default Routes;