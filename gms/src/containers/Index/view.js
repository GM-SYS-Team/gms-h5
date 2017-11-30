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
        if(index === 0){
            browserHistory.push("/youzhuanbei");
        }
    }


    render(){

        const data = Array.from([
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `国码优赚呗`,
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `社区`,
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `广电`,
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `拓展`,
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `印章`,
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `微商`,
            }
        ]);

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