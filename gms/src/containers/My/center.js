import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {WhiteSpace, WingBlank,Icon, List,Card} from 'antd-mobile';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import {getCookie, resetCookieExpireDate} from "../../utils/cookie";

const Item = List.Item;
const Brief = Item.Brief;

class Center extends React.Component{

    constructor(props) {
        super(props);

        const userToken = getCookie("userToken");

        //使用
        if(typeof userToken === "undefined" || userToken === null){
            browserHistory.push("/login");
        }
    }

    render(){

        //1商家2个人
        let userType = localStorage.getItem("userType");

        return (
            <div className="my" >

                <TopBar
                    title="个人信息"
                    hideback="true"
                />

                <Card full>
                    <Link to="/editUserInfo">
                        <Card.Header
                            style={{marginTop:10}}
                            title={
                                <div style={{fontSize:14,marginLeft:10}}>
                                    <div>{localStorage.getItem("nickName")}</div>
                                    <div style={{color:"#999",marginTop:10}}>{localStorage.getItem("phoneNum")}</div>
                                </div>
                            }
                            extra={<span> <Icon color="#ccc" type="right" size="lg" /> </span>}
                            thumb={localStorage.getItem("imgUrl") !== "null"?localStorage.getItem("imgUrl"):"https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"}
                        />
                    </Link>
                </Card>

                <WhiteSpace/>
                <List className="link-list">
                    <Link to="/draw" style={{display:userType === "2"?"none":""}}>
                        <Item arrow="horizontal" onClick={() => {}}>店铺信息</Item>
                    </Link>
                    <Link to="/my/coupon" style={{display:userType === "1"?"none":""}}>
                        <Item extra="" arrow="horizontal" onClick={() => {}}>我的优惠券</Item>
                    </Link>

                    <Item extra="beta 1.0" onClick={() => {}}>版本号</Item>
                </List>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Center);
