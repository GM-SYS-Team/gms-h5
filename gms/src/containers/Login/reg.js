import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Checkbox,Flex , Toast ,SegmentedControl,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import Areas from "../../components/FormItem/areas";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class Reg extends React.Component{

    timer = null;

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    state = {
        formError:{},
        userType : 0,
        count:60,
        smsAble:true,

        showComm:false,
        smsCodeWords:"获取验证码",
    }

    //错误提示
    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message);
        }
    }

    //请求参数
    params = {
        userType : 0,
        isAgree:false,
    }

    //tab修改
    onUserTypeChange = (e) =>{
        let index = e.nativeEvent.selectedSegmentIndex;
        this.params.userType = index;
        this.setState({userType:index});
        if(index === 0){
            this.setState({showComm:false});
        }else{
            this.setState({showComm:true});
        }
    }

    //同意协议
    agreeChecked =(e)=>{
        this.params.isAgree = e.target.checked;
    }

    //发送验证
    sendVerifyCode = () =>{
        if(!this.state.smsAble){
            return;
        }

        let phone = this.props.form.getFieldValue("phoneNum");
        if(typeof phone === "undefined"){
            Toast.info("请先输入手机号码");
            return;
        }
        this.props.sendVerifyCode({telephone:phone});

        //倒计时
        this.timer = setInterval(function () {
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
        }.bind(this), 1000);
    }

    //注册
    submit = () => {

        if(!this.params.isAgree){
            Toast.info("请先同意《国码扫用户注册协议》");
            return;
        }

        this.props.form.validateFields((error, values) => {
            values.userType = this.params.userType;
            values.district =  values.district.join(",");
            if (!error) {
                this.setState({formError: {}})
                this.props.reg(values);
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
                    title="填写注册信息"
                />

                <WhiteSpace/>

                <WingBlank size="lg" className="sc-example" style={{margin:"10px",marginTop:20}}>
                    <SegmentedControl onChange={e => this.onUserTypeChange(e)}  values={['个人', '商家']} selectedIndex={this.state.userType} />
                </WingBlank>

                <WhiteSpace />
                <List renderHeader={() => '请填写准确信息，以确保我们能帮到您'}>

                    <InputItem
                        {...getFieldProps('phoneNum',{
                            rules: [{ required: true,message:"请输入手机号"}],
                        })}
                        placeholder="请输入手机号码"
                        type="phone"
                        error={typeof this.state.formError["phoneNum"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"phoneNum")}
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

                <List style={{display:this.state.showComm?"":"none"}}>

                    <InputItem
                        {...getFieldProps('shopName', {
                            initialValue: '',
                        })}
                        placeholder="请输入商户名称"
                    >商户名称</InputItem>

                    <InputItem
                        {...getFieldProps('trueName', {
                            initialValue: '',
                        })}
                        placeholder="请输入联系人"
                    >联系人</InputItem>

                    <Picker
                        extra="请选择省区"
                        data={Areas}
                        title="请选择省区"
                        {...getFieldProps('district', {

                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">店铺地址</List.Item>
                    </Picker>

                    <InputItem
                        {...getFieldProps('address', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入详细地址"
                    >详细地址</InputItem>

                   {/* <Picker extra="请选择所属行业"
                            title="Areas"
                            {...getFieldProps('district', {
                                initialValue: ['340000', '341500', '341502'],
                            })}
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">所属行业</List.Item>
                    </Picker>*/}

                </List>


                <Flex>
                    <Flex.Item>
                        <AgreeItem
                            data-seed="logId"
                            onChange={e => this.agreeChecked(e)}
                        >
                            <span style={{color:"#999",fontSize:12}}>
                                <span >我已阅读并同意</span>
                                <a style={{color:"#f90"}} onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《国码扫用户注册协议》</a>
                            </span>
                        </AgreeItem>
                    </Flex.Item>
                </Flex>

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
    reg:actions.reg
}, dispatch);
export default connect(null, mapDispatchToProps)(RegFormWrapper);
