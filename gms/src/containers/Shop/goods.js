import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,SwipeAction} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

class Goods extends React.Component{

    constructor(props) {
        super(props);
    }



    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="shop" >

                <TopBar
                    title="商品管理"
                    rightContent={(
                        <Link to="/shop/1/goodsAdd">新增</Link>
                    )}
                />

                <List renderHeader={() => '商品列表'} className="link-list">


                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    >
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>


                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    >
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>

                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    >
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>

                </List>

            </div>
        );
    }
}

const GoodsFormWrapper = createForm()(Goods);

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GoodsFormWrapper);
