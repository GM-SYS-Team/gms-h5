import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {Grid , WhiteSpace, Badge, Flex, List} from 'antd-mobile';
import {Link} from 'react-router';
import TopBar from "../../components/Container/TopBar";

const Item = List.Item;
const Brief = Item.Brief;

class Index extends React.Component{


    gridClick = (index) =>{
        let userType = localStorage.getItem("userType");

        if(typeof userType !== "undefined" && userType == "2"){
            index++;
        }

        if(index === 0){

            browserHistory.push("/youzhuanbei");
        }
        if(index === 1){
            browserHistory.push("/index/shequ?title=社区");
        }
        if(index === 2){
            browserHistory.push("/index/guangdian");
        }
        if(index === 3){
            browserHistory.push("/index/shequ?title=拓展");
        }
        if(index === 4){
            browserHistory.push("/index/shequ?title=印章");
        }
        if(index === 5){
            browserHistory.push("/index/shequ?title=微商");
        }
    }


    render(){

        let data = [
            {
                icon: require('./view/icon1.png'),
                text: `国码优赚呗`,
            },
            {
                icon: require('./view/icon2.png'),
                text: `社区`,
            },
            {
                icon: require('./view/icon3.png'),
                text: `广电`,
            },
            {
                icon: require('./view/icon4.png'),
                text: `拓展`,
            },
            {
                icon: require('./view/icon5.png'),
                text: `印章`,
            },
            {
                icon: require('./view/icon6.png'),
                text: `微商`,
            }
        ];

        //1商家2个人
        let userType = localStorage.getItem("userType");
        if(typeof userType !== "undefined" && userType == "2"){
            data.splice(0,1);
        }


        let isShowLogin = typeof localStorage.getItem("userToken") === "undefined";


        return (
            <div className="index" >

                <TopBar
                    hideback="true"
                    title="国码扫"
                    rightContent={isShowLogin?(
                        <Link to="/login">登录</Link>
                    ):""}
                />

                <Grid
                    data={data}
                    columnNum={3}
                    onClick={(el,index) => this.gridClick(index)}/>
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
