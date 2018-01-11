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

        let picUrl = "./view/"+ this.props.location.query.pic+".jpg";

        return (
            <div className="index" >

                <TopBar
                    title={this.props.location.query.title}
                    targetPage="/"
                />
                <img style={{width:"100%"}} src={require('./view/'+this.props.location.query.pic+'.jpg')} alt=""/>

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
