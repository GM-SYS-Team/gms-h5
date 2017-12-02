import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import { WingBlank,List, ImagePicker , WhiteSpace, Button, Flex, Toast, Modal  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import {getCookie,setCookie} from '../../utils/cookie';

const Item = List.Item;
const prompt = Modal.prompt;

class Login extends React.Component{

    state = {
        nickName: localStorage.getItem("nickName"),
        formError:{},

        files: [{
            url: localStorage.getItem("imgUrl") !== "null"?localStorage.getItem("imgUrl"):"https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png",
            id: '10000',
        }],
    }

    //退出登录
    loginOut = () =>{
        setCookie("userToken",null);
        localStorage.removeItem("userToken");
        browserHistory.push("/login");
    }

    //修改昵称
    onChangeNickName = (value) =>{
        this.props.modifyNickName({nickName:value},() => {
            this.setState({nickName:value})
        });
    }

    //修改头像
    onChange = (files, type, index) => {
        this.setState({files:[files[files.length-1]]});
        //执行上传
        this.props.changeHeadImg(this.state.files[0].url);
    }


    render(){
        const { getFieldProps } = this.props.form;

        const { files } = this.state;

        return (
            <div className="login">
                <TopBar
                    title="修改个人信息"
                />

                <WhiteSpace/>

                {/**/}
                <List renderHeader={() => '基本信息'} >
                    <Item extra={(
                        <div style={{position:"relative",right:"-50%"}}>

                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 2}
                            />

                            {/*<img src={localStorage.getItem("imgUrl") !== "null"?localStorage.getItem("imgUrl"):"https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"} alt=""/>*/}
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
    modifyNickName : actions.modifyNickName,
    changeHeadImg: actions.changeHeadImg
}, dispatch);
export default connect(null, mapDispatchToProps)(LoginFormWrapper);
