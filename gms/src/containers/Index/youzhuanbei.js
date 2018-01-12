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

    }


    render(){

        return (
            <div className="index">

                <TopBar
                    title="优赚呗"
                    targetPage="/"
                />

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
};

//注入state和actions
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Index);
