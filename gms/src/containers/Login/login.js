import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Flex, Toast, SegmentedControl  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

class Login extends React.Component{

    state = {
        name:localStorage.getItem("rememberUserName"),
        password:localStorage.getItem("rememberPassword"),
        rememberPassword: localStorage.getItem("rememberUserName") !== null,
        formError:{}
    }

    params = {
        userType : 0
    }

    onUserTypeChange = (e) =>{
        let index = e.nativeEvent.selectedSegmentIndex;
        this.params.userType = index;
        this.setState({userType:index});
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message,1);
        }
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                values.userType = this.params.userType;
                this.props.login(values);
            }else{
                this.setState({formError: error})
            }
        });
    }


    render(){
        const { getFieldProps } = this.props.form;

        return (
            <Container className="login">
                <TopBar
                    title="登录"
                    hideback="true"
                />

                <WingBlank>

                    {/*logo*/}
                    <div style={{textAlign:"center",margin:"50px 0"}}>
                        <img  style={{width:"30%"}} src={require('./view/logo.png')} alt=""/>
                    </div>

                    <WingBlank size="lg" style={{margin:"10px",marginTop:20}}>
                        <SegmentedControl onChange={e => this.onUserTypeChange(e)} values={['个人', '商家']}  selectedIndex={this.state.userType} />
                    </WingBlank>

                    <WhiteSpace/>

                    {/**/}
                    <List>
                        <InputItem
                            {...getFieldProps('telephone',{
                                rules: [{ required: true,message:"请输入用户名或手机号"}],
                                initialValue: this.state.name
                            })}
                            type="text"
                            placeholder="请输入用户名或手机号"
                            error={typeof this.state.formError["telephone"] !== "undefined"}
                            onErrorClick={this.onErrorClick.bind(this,"telephone")}
                        >账号</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <InputItem
                            {...getFieldProps('password',{
                                rules: [{ required: true,message:"请输入密码"}],
                                initialValue: this.state.password
                            })}
                            type="password"
                            placeholder="请输入密码"
                            error={typeof this.state.formError["password"] !== "undefined"}
                            onErrorClick={this.onErrorClick.bind(this,"password")}
                        >密码</InputItem>
                    </List>

                    <WhiteSpace/>
                    <WhiteSpace/>

                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>登录</Button>

                    <WhiteSpace/>
                    <WhiteSpace/>

                    <Flex style={{fontSize:14,color:"#666"}}>
                        <Flex.Item style={{textAlign:"left"}}><Link to="/forget"><span style={{color:"#000"}}>忘记密码？</span></Link></Flex.Item>
                        <Flex.Item style={{textAlign:"right"}}>还没有账号？ <Link to="/reg"> <span style={{color:"#000"}}>立即注册</span></Link></Flex.Item>
                    </Flex>


                </WingBlank>
            </Container>
        );
    }
}

const LoginFormWrapper = createForm()(Login);
//组件名和组件初始化状态
export const stateKey = "login";
export const initialState = {
    login: {}
};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    login : actions.login
}, dispatch);
export default connect(null, mapDispatchToProps)(LoginFormWrapper);
