import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {WingBlank, WhiteSpace, Modal,ListView, List,InputItem,Flex,Button,Checkbox,Toast,Switch} from 'antd-mobile';
import "../../utils/DateFormat";
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

/*生成订单-订单详情*/
class OrderDetail extends React.Component{

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let orderId = this.props.params.orderId;
        this.props.getOrderDetail({
           shopId:this.props.params.id,
           saleListId:orderId
        });
    }

    render(){

        let order = this.props.orderDetail;
        let customer = order.customer;
        if(typeof customer === "undefined"){
            customer = {};
        }

        let orderGoodsPage = [];
        if(typeof order.saleListGoodsList !== "undefined" && order.saleListGoodsList != null){
            let saleListGoodsList = order.saleListGoodsList;

            saleListGoodsList.forEach((item,index)=>{
                orderGoodsPage.push(
                    <WingBlank>
                        <div style={{width:"100%", borderBottom:"1px solid #e9e9e9",padding:"10px 0"}}>
                            <div style={{}}>{item.name}</div>
                            <Flex style={{fontSize:14,marginTop:10}}>
                                <Flex.Item>销售价：{item.price}</Flex.Item>
                                <Flex.Item>总金额：{item.total }</Flex.Item>
                                <Flex.Item>数量：{item.num }</Flex.Item>
                            </Flex>
                        </div>
                    </WingBlank>
                );
            });
        }

        return (

            <Container className="order" >

                <TopBar
                    title="订单详情"
                    targetPage={"/shop/"+this.props.params.id+"/order/list"}
                />

                <List className="link-list">
                    <List.Item extra={customer.name}>收货人</List.Item>
                    <List.Item extra={customer.number}>电话</List.Item>
                    <List.Item extra={customer.address}>地址</List.Item>
                </List>
                <WhiteSpace/>
                <List className="link-list">
                    {orderGoodsPage}
                </List>
                <WhiteSpace/>
                <List className="link-list">
                    <List.Item extra={order.amountPaid}>销售总额</List.Item>
                    <List.Item extra={order.saleNumber}>销售单号</List.Item>
                    <List.Item extra={order.saleDate}>销售日期</List.Item>
                </List>

            </Container>
        );
    }
}

const OrderDetailWrapper = createForm()(OrderDetail);

//组件名和组件初始化状态
export const stateKey = "order";
export const initialState = {
    orderDetail:{}
};
//注入state和actions
const mapStateToProps = (state) => ({
    orderDetail:state[stateKey].orderDetail
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getOrderDetail:actions.getOrderDetail
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailWrapper);
