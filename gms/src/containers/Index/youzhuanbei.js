import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import TopBar from "../../components/Container/TopBar";

import {Grid , WhiteSpace, Badge, Flex, List} from 'antd-mobile';
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class Index extends React.Component{


    componentDidMount(){
        //用户店铺列表
        this.props.loadingShopList({});

        console.log(this.props.shopList);
    }


    render(){

        return (
            <div className="index" >

                <TopBar title="优赚呗"/>

                <List renderHeader={() => '优赚呗'} className="link-list">
                    <Link to="/shop/manager">
                        <Item arrow="horizontal" onClick={() => {}}>店铺管理</Item>
                    </Link>

                </List>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "index";
export const initialState = {
    shopList:[],
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopList:state[stateKey].shopList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadingShopList:actions.loadingShopList
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Index);
