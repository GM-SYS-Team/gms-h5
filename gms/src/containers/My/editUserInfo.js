import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import '../Login/view/login.less';
import { browserHistory } from 'react-router'

import { WingBlank,List, InputItem, WhiteSpace, Button, Flex, Toast, Modal  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import {getCookie,setCookie} from '../../utils/cookie';

const Item = List.Item;
const prompt = Modal.prompt;

class Login extends React.Component{

    state = {
        nickName: localStorage.getItem("nickName"),
        formError:{}
    }

    loginOut = () =>{
        setCookie("userToken",null);
        localStorage.removeItem("userToken");
        browserHistory.push("/login");
    }

    onUserTypeChange = (e) =>{
        let index = e.nativeEvent.selectedSegmentIndex;
        this.params.userType = index;
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message);
        }
    }

    onChangeNickName = (value) =>{
        this.props.modifyNickName({nickName:value},() => {
            this.setState({nickName:value})
        });

    }


    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="login">
                <TopBar
                    title="修改个人信息"
                />

                <WhiteSpace/>

                {/**/}
                <List renderHeader={() => '基本信息'} >
                    <Item extra={(
                        <div>
                            <img src={localStorage.getItem("imgUrl") !== "null"?localStorage.getItem("imgUrl"):"https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"} alt=""/>
                        </div>
                    )} arrow="horizontal" onClick={() => {}}>头像</Item>
                    <Item
                        extra={(<div>{this.state.nickName}</div>)}
                        arrow="horizontal"
                        onClick={() => prompt('修改昵称', '',
                            [
                                { text: '取消' },
                                {
                                    text: '确定',
                                    onPress: value => this.onChangeNickName(value),
                                },
                            ], 'default', null, ['请输入昵称'])}
                    >昵称</Item>
                </List>

                <Button style={{height:40,lineHeight:"40px",position:'fixed',bottom:10,width:"80%",marginLeft:"10%"}} type="primary" onClick={this.loginOut}>退出登陆</Button>



            </div>
        );
    }
}

const LoginFormWrapper = createForm()(Login);
//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {
    modifyNickName: {}
};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    modifyNickName : actions.modifyNickName
}, dispatch);
export default connect(null, mapDispatchToProps)(LoginFormWrapper);
