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

class Shequ extends React.Component{


    componentDidMount(){

    }


    render(){

        return (
            <div className="index" >

                <TopBar
                    title={this.props.location.query.title}
                    targetPage="/"
                />

                <p style={{fontSize:14,color:"#666",textAlign:"center",marginTop:20}}>功能暂未开放，敬请期待</p>

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
export default connect(mapStateToProps, mapDispatchToProps)(Shequ);
