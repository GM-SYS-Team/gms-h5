import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {Grid , WhiteSpace, Badge, Flex, List,Modal} from 'antd-mobile';
import {Link} from 'react-router';
import TopBar from "../../components/Container/TopBar";
import {getCookie, resetCookieExpireDate} from "../../utils/cookie";

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;

class Index extends React.Component{


    gridClick = (index) =>{
        let userType = localStorage.getItem("userType");

        if(index === 0){
            let userToken = getCookie("userToken");
            if(typeof userToken === "undefined" || userToken === null ){
                browserHistory.push("/login");
                return;
            }

            //1商家2个人
            if(typeof userType !== "undefined" && userType == "1"){
                browserHistory.push("/youzhuanbei");
            }else{
                alert('提示', '您不是商家用户', [
                    {
                        text: '暂不注册',
                        onPress: () =>  console.log('ok')
                    },{
                        text: '注册商家',
                        onPress: () =>  browserHistory.push("/regBus")
                    },
                ])
            }
        }
        if(index === 1){
            browserHistory.push("/index/shequ?title=社区&pic=shequ");
        }
        if(index === 2){
            browserHistory.push("/index/shequ?title=广电&pic=guangdian");
        }
        if(index === 3){
            browserHistory.push("/index/shequ?title=拓展&pic=tuozhan");
        }
        if(index === 4){
            browserHistory.push("/index/shequ?title=印章&pic=yinzhang");
        }
        if(index === 5){
            browserHistory.push("/index/shequ?title=微商&pic=weishang");
        }
    }


    render(){

        let data = [
            {
                icon: require('./view/icon1.png'),
                text: `优赚呗`,
            }/*,
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
            }*/
        ];

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
                    hasLine={false}
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
