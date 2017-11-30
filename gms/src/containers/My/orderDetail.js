import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {Tabs, WhiteSpace, Badge, Flex, List,SearchBar} from 'antd-mobile';
import StateTag from '../../components/TableItem/stateTag';
import PayType from '../../components/OrderItem/payType';
import MoneyFormat from '../../components/MoneyTools/MoneyFormat';
import moment from 'moment';
import 'moment/locale/zh-cn';

const Item = List.Item;
const Brief = Item.Brief;

class orderDetail extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let orderId = this.props.location.query.orderId;
        this.props.getOrderById({orderId:orderId});
    }

    render(){

        let order = this.props.orderDetail;
        let user = {};
        if(typeof order.muUser !== "undefined"){
            user = order.muUser;
        }
        let goods = [];
        let goodsCollect = [];
        if(typeof order.goodsList !== "undefined"){
            goods = order.goodsList;

            console.log(goods);

            for(var i = 0; i < goods.length;i++){
                var goodsItem = goods[i];
                goodsCollect.push(
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left',marginRight:10}}>
                            <img style={{width:50,height:'auto'}} src={goodsItem.imgSm} alt=""/>
                        </div>
                        <div style={{float:'left',fontSize:12}}>
                            <div>{goodsItem.name}*1</div>
                            <div><MoneyFormat postfix="元" amount={goodsItem.price}/></div>
                        </div>
                    </div>
                )

            }
        }


        let itemStyle = {
            fontSize: 12
        }

        let prefix = {
            fontSize: 12,
            color:'#999'
        }

        let postfix = {
            fontSize: 12
        }

        return (
            <div className="order-detail" >

                <List className="my-list">
                    <Item style={itemStyle}>
                        <span style={prefix}>订单编号：</span>
                        <span style={postfix}>{order.orderNbr}</span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>下单时间：</span>
                        <span style={postfix}>{order.createDt}</span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>完成时间：</span>
                        <span style={postfix}>{order.version}</span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>订单状态：</span>
                        <span style={postfix}><StateTag stateType="orderState" state={order.state}/></span>
                    </Item>
                </List>

                <WhiteSpace/>

                <List className="my-list">
                    <Item style={itemStyle}>
                        <span style={prefix}>购买客户：</span>
                        <span style={postfix}>{user.nickname}</span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>电话：</span>
                        <span style={postfix}>{user.mobile}</span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>支付方式：</span>
                        <span style={postfix}><PayType payType={order.payType} /></span>
                    </Item>
                    <Item style={itemStyle}>
                        <span style={prefix}>订单金额：</span>
                        <span style={postfix}><MoneyFormat amount={order.cash*0.01}/></span>
                    </Item>
                </List>

                <WhiteSpace/>

                <List className="my-list">
                    <Item style={itemStyle}>
                        <span style={prefix}>商品清单：</span>
                    </Item>
                    <Item style={itemStyle}>
                        {goodsCollect}
                    </Item>
                </List>

                <WhiteSpace/>

                <List className="my-list">
                    <Item style={itemStyle}>
                        <span style={prefix}>订单备注：</span>
                    </Item>
                    <div>
                        {order.remark}
                    </div>
                </List>

                <WhiteSpace/>

                <List className="my-list">
                    <Item style={itemStyle}>
                        <span style={prefix}>客户投诉：</span>
                    </Item>
                    <div>{order.remark}</div>
                </List>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "order";
export const initialState = {
    orderDetail : {}
};

//注入state和actions
const mapStateToProps = (state) => ({
    orderDetail : state[stateKey].orderDetail,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getOrderById: actions.getOrderById,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(orderDetail);
