import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ImagePicker,Toast,ActivityIndicator } from 'antd-mobile';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";


import { createForm } from 'rc-form';
import {uploadImg} from "../../utils/ajax";
const Item = List.Item;
const Brief = Item.Brief;

/*客户新增或者编辑*/
class AddOrEdit extends React.Component{

    constructor(props) {
        super(props);

        //编辑的值
        let customer = localStorage.getItem("currentCustomer");
        if(typeof customer === "undefined" || customer == null){
            customer = {};
        }else{
            customer = JSON.parse(customer);
        }
        localStorage.removeItem("currentCustomer");

        this.state = {
            formError:{},
            loading:false,
            customer:customer
        }
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                values.shopId = this.props.params.id;
                if(typeof this.state.customer.id !== "undefined"){
                    values.id =  this.state.customer.id;
                    this.props.editCustomer(values);
                }else{
                    this.props.addCustomer(values);
                }

            }else{
                this.setState({formError: error})
            }
        });
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message,1);
        }
    }

    render(){
        const { getFieldProps } = this.props.form;

        return (
            <Container className="customer add" >

                <TopBar
                    title="新建客户"
                />

                <List className="link-list">

                    <InputItem
                        {...getFieldProps('name', {
                            initialValue: this.state.customer.name,
                            rules: [{ required: true,message:"请输入客户名称"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["name"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"name")}
                    >客户名称</InputItem>

                    <InputItem
                        {...getFieldProps('contact', {
                            initialValue: this.state.customer.contact,
                            rules: [{ required: true,message:"请输入联系人"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["contact"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"contact")}
                    >联系人</InputItem>

                    <InputItem
                        {...getFieldProps('number', {
                            initialValue: this.state.customer.number,
                            rules: [{ required: true,message:"请输入电话"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["number"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"number")}
                    >电话</InputItem>

                    <InputItem
                        {...getFieldProps('address', {
                            initialValue: this.state.customer.address,
                            rules: [{ required: true,message:"请输入联系地址"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["address"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"address")}
                    >联系地址</InputItem>

                    <InputItem
                        {...getFieldProps('remarks', {
                            initialValue: this.state.customer.remarks,
                            rules: [{ required: false,message:"请输入备注"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["remarks"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"remarks")}
                    >备注</InputItem>

                </List>

                <WingBlank>
                    <WhiteSpace/>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>完成</Button>
                </WingBlank>

            </Container>
        );
    }
}

const AddOrEditFormWrapper = createForm()(AddOrEdit);

//组件名和组件初始化状态
export const stateKey = "customer";
//初始化state
export const initialState = {
};
//注入state
const mapStateToProps = (state) => ({
});
//注入action
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addCustomer:actions.addCustomer,
    editCustomer: actions.editCustomer,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditFormWrapper);
