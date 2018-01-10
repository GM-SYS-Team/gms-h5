import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Checkbox,Flex , Toast ,SegmentedControl,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class Reg extends React.Component{

    timer = null;

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    state = {
        name:localStorage.getItem("rememberUserName"),
        password:localStorage.getItem("rememberPassword"),
        rememberPassword: localStorage.getItem("rememberUserName") !== null,

        smsCodeWords:"获取验证码",
        formError:{},

        count:60,
        smsAble:true,
    }



    //请求参数
    params = {
        userType : 2,
    }

    //tab修改
    onUserTypeChange = (e) =>{
        let index = e.nativeEvent.selectedSegmentIndex;
        if(index === 0){
            this.params.userType = 2;
        }else{
            this.params.userType = 1;
        }
        this.setState({userType:index});
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message,1);
        }
    }

    //发送验证
    sendVerifyCode = () =>{
        if(!this.state.smsAble){
            return;
        }

        let phone = this.props.form.getFieldValue("telephone");
        if(typeof phone === "undefined"){
            Toast.info("请先输入手机号码",1);
            return;
        }
        this.props.sendVerifyCode({telephone:phone});

        //倒计时
        this.timer = setInterval(function () {

            try {
                var count = this.state.count;
                count -= 1;
                if (count < 1) {
                    this.setState({
                        smsCodeWords: "获取验证码",
                        smsAble:true
                    });
                    count = 60;
                    clearInterval(this.timer);
                }else{
                    this.setState({
                        smsCodeWords: "重新发送("+count+")",
                        smsAble:false
                    });
                }
                this.setState({
                    count: count
                });
            } catch(error) {
                clearInterval(this.timer);
            }


        }.bind(this), 1000);
    }


    submit = () => {
        this.props.form.validateFields((error, values) => {
            values.userType = this.params.userType;
            if (!error) {
                this.setState({formError: {}})
                this.props.forgetPassword(values);
            }else{
                this.setState({formError: error})
            }
        });
    }


    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="reg">
                <TopBar
                    title="重置密码"
                />

                <WingBlank size="lg" style={{margin:"10px",marginTop:20}}>
                    <SegmentedControl onChange={e => this.onUserTypeChange(e)} values={['个人', '商家']} selectedIndex={this.state.userType} />
                </WingBlank>

                <WhiteSpace />
                <List>

                    <InputItem
                        {...getFieldProps('telephone')}
                        placeholder="请输入手机号码"
                        type="phone"
                        error={typeof this.state.formError["telephone"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"telephone")}
                        extra={
                            <Button onClick={this.sendVerifyCode} type="ghost" inline size="small" style={{ marginRight: '4px',height:30,lineHeight: "30px"}}>{this.state.smsCodeWords}</Button>
                        }
                    >手机号码</InputItem>

                    <InputItem
                        {...getFieldProps('smsCode', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入验证码"}],
                        })}
                        type="number"
                        placeholder="请输入验证码"
                        error={typeof this.state.formError["smsCode"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"smsCode")}
                    >验证码</InputItem>

                    <InputItem
                        {...getFieldProps('password', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入您要设置的密码"}],
                        })}
                        type="password"
                        placeholder="请输入您要设置的密码"
                        error={typeof this.state.formError["password"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"password")}
                    >密码</InputItem>

                    <InputItem
                        {...getFieldProps('repassword',{
                            initialValue: '',
                            rules: [{ required: true,message:"请再次输入您要设置的密码"}],
                        })}
                        type="password"
                        placeholder="请再次输入您要设置的密码"
                        error={typeof this.state.formError["repassword"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"repassword")}
                    >确认密码</InputItem>

                </List>

                <WhiteSpace/>
                <WhiteSpace/>

                <WingBlank>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>提交</Button>
                </WingBlank>




            </div>
        );
    }
}

const RegFormWrapper = createForm()(Reg);
//组件名和组件初始化状态
export const stateKey = "login";
export const initialState = {

};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendVerifyCode : actions.sendVerifyCode,
    forgetPassword: actions.forgetPassword,
}, dispatch);
export default connect(null, mapDispatchToProps)(RegFormWrapper);
