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

/*库存新增或者编辑*/
class AddOrEdit extends React.Component{

    constructor(props) {
        super(props);

        //编辑的值
        let stock = localStorage.getItem("currentStock");
        if(typeof stock === "undefined" || stock == null){
            stock = {};
        }else{
            stock = JSON.parse(stock);
        }
        localStorage.removeItem("currentStock");

        this.state = {
            formError:{},
            loading:false,
            stock:stock
        }
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                values.shopId = this.props.params.id;
                if(typeof this.state.stock.id !== "undefined"){
                    values.id =  this.state.stock.id;
                    //this.props.editStock(values);
                }else{
                    //this.props.addStock(values);
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
            <Container className="stock add" >

                <TopBar
                    title="新建库存"
                />

                <List className="link-list">

                    <InputItem
                        {...getFieldProps('name', {
                            initialValue: this.state.stock.name,
                            rules: [{ required: true,message:"请输入库存名称"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["name"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"name")}
                    >库存名称</InputItem>

                    <InputItem
                        {...getFieldProps('contact', {
                            initialValue: this.state.stock.contact,
                            rules: [{ required: true,message:"请输入联系人"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["contact"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"contact")}
                    >联系人</InputItem>

                    <InputItem
                        {...getFieldProps('number', {
                            initialValue: this.state.stock.number,
                            rules: [{ required: true,message:"请输入电话"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["number"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"number")}
                    >电话</InputItem>

                    <InputItem
                        {...getFieldProps('address', {
                            initialValue: this.state.stock.address,
                            rules: [{ required: true,message:"请输入联系地址"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["address"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"address")}
                    >联系地址</InputItem>

                    <InputItem
                        {...getFieldProps('remarks', {
                            initialValue: this.state.stock.remarks,
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
export const stateKey = "stock";
//初始化state
export const initialState = {
};
//注入state
const mapStateToProps = (state) => ({
});
//注入action
const mapDispatchToProps = (dispatch) => bindActionCreators({
    /*addStock:actions.addStock,
    editStock: actions.editStock,*/
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditFormWrapper);
