import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

class Detail extends React.Component{

    constructor(props) {
        super(props);
    }



    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="shop" >

                <TopBar
                    title="店铺管理"
                />

                <List renderHeader={() => '店铺信息'} className="link-list">
                    <Item extra="123123" onClick={() => {}}>店铺名称</Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>店铺二维码</Item>
                </List>

                <List renderHeader={() => '商品和优惠券'} className="link-list">
                    <Link to="/shop/1/goods">
                        <Item arrow="horizontal" onClick={() => {}}>商品</Item>
                    </Link>
                    <Link to="/shop/1/coupon">
                        <Item arrow="horizontal" onClick={() => {}}>优惠券</Item>
                    </Link>
                </List>

            </div>
        );
    }
}

const DetailFormWrapper = createForm()(Detail);

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DetailFormWrapper);
