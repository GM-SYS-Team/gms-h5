import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,Card} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class Center extends React.Component{

    constructor(props) {
        super(props);
    }



    render(){

        return (
            <div className="shop" >

                <TopBar
                    title="店铺管理"
                    rightContent={(
                        <Link to="/shop/add">新增</Link>
                    )}
                />

                <List renderHeader={() => '店铺列表'} className="link-list">
                    <Link to="/shop/detail/1">
                        <Item arrow="horizontal" onClick={() => {}}>店铺1</Item>
                    </Link>
                    <Link to="/shop/detail/1">
                        <Item arrow="horizontal" onClick={() => {}}>店铺1</Item>
                    </Link>
                    <Link to="/shop/detail/1">
                        <Item arrow="horizontal" onClick={() => {}}>店铺1</Item>
                    </Link>
                    <Link to="/shop/detail/1">
                        <Item arrow="horizontal" onClick={() => {}}>店铺1</Item>
                    </Link>
                </List>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Center);
