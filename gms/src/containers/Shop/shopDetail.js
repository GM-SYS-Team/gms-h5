import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,Modal} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

class Detail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
        };
    }

    componentDidMount(){
        let shopId = this.props.params.id;
        //店铺详情
        this.props.getShopDetail({shopId:shopId});
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }


    render(){

        let shopDetail = {};
        if(typeof this.props.shopDetail !== "undefined"){
            shopDetail = this.props.shopDetail;
        }

        let goodsUrl = "/shop/"+this.props.params.id+"/goods";
        let couponUrl = "/shop/"+this.props.params.id+"/coupon";

        return (
            <Container className="shop_detail" >

                <TopBar
                    title="店铺管理"
                    targetPage={"/shop/manager"}
                />

                <List renderHeader={() => '店铺信息'}>
                    <Item extra={shopDetail.shopName} onClick={() => {}}>店铺名称</Item>
                    <Item extra="" arrow="horizontal" onClick={this.showModal('modal1')}>店铺二维码</Item>
                </List>

                <List renderHeader={() => '进销存'} className="link-list">
                    <Link to={goodsUrl}>
                        <Item arrow="horizontal" onClick={() => {}}>商品管理</Item>
                    </Link>
                    <Link to={"/shop/"+this.props.params.id+"/stock/list"}>
                        <Item arrow="horizontal" onClick={() => {}}>库存管理</Item>
                    </Link>
                    <Link to={"/shop/"+this.props.params.id+"/order/list"}>
                        <Item arrow="horizontal" onClick={() => {}}>订单管理</Item>
                    </Link>
                    <Link to={"/shop/"+this.props.params.id+"/supplier/list"}>
                        <Item arrow="horizontal" onClick={() => {}}>供应商管理</Item>
                    </Link>
                    <Link to={"/shop/"+this.props.params.id+"/customer/list"}>
                        <Item arrow="horizontal" onClick={() => {}}>客户管理</Item>
                    </Link>
                </List>

                <List renderHeader={() => '优惠券'} className="link-list">
                    <Link to={couponUrl}>
                        <Item arrow="horizontal" onClick={() => {}}>优惠券</Item>
                    </Link>
                </List>

                <Modal
                    className="shop_detail_modal"
                    visible={this.state.modal1}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal1')}
                    title=""
                    /*footer={[{ text: '关闭', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}*/
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <img style={{width:"100%"}} src={shopDetail.quickMark} alt=""/>
                </Modal>
            </Container>
        );
    }
}

const DetailFormWrapper = createForm()(Detail);

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {
    shopDetail:{}
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopDetail: state[stateKey].shopDetail
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getShopDetail: actions.getShopDetail
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DetailFormWrapper);
