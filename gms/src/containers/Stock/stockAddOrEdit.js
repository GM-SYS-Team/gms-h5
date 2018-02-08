import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ImagePicker,Toast,ActivityIndicator, Picker, Switch  } from 'antd-mobile';
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

        this.state = {
            formError:{},
            loading:false,
            stock:{},
            selectedGoods:{}
        }
    }

    componentDidMount(){
        //加载商品列表
        this.props.listShopGoods({shopId:this.props.params.id});
        //加载供应商列表
        this.props.listSupplier({shopId:this.props.params.id});
    }

    goodsPickerChange = (value) =>{
        let goodsId = value[0];
        let shopGoodsList = this.props.shopGoodsList;
        shopGoodsList.forEach((item,index)=>{
            if(item.id == goodsId){
                console.log(item);
                this.setState({
                    selectedGoods:item
                });
            }
        });
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                values.shopId = this.props.params.id;
                values.goodsId = values.goodsId[0];
                values.supplierId = values.supplier[0];
                delete values.supplier;
                this.props.addStock(values);

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

        //格式化商品列表
        let shopGoodsList = this.props.shopGoodsList;
        let shopGoodsListData = [];
        shopGoodsList.forEach((item,index)=>{
            shopGoodsListData.push({
                label:item.name,
                value:item.id,
            })
        });

        //格式化供应商列表
        let supplierList = this.props.supplierList;
        let supplierListData = [];
        supplierList.forEach((item,index)=>{
            supplierListData.push({
                label:item.name,
                value:item.id,
            })
        });



        return (
            <Container className="stock add" >

                <TopBar
                    title="新建库存"
                />

                <List className="link-list">

                    <Picker
                        data={shopGoodsListData}
                        cols={1}
                        {...getFieldProps('goodsId', {
                            initialValue: '',
                            rules: [{ required: true,message:"请选择商品"}],
                        })}
                        className="forss"
                        placeholder="请选择商品"
                        error={typeof this.state.formError["goodsId"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"goodsId")}
                        onOk={(val)=>{this.goodsPickerChange(val)}}
                    >
                        <List.Item arrow="horizontal">商品</List.Item>
                    </Picker>

                    <Item extra={this.state.selectedGoods.lastPurchasingPrice}>上次进价</Item>
                    <Item extra={this.state.selectedGoods.inventoryQuantity}>当前库存</Item>

                    <InputItem
                        {...getFieldProps('price', {
                            initialValue: this.state.stock.number,
                            rules: [{ required: true,message:"请输入单价"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["price"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"price")}
                    >单价</InputItem>

                    <InputItem
                        {...getFieldProps('num', {
                            initialValue: this.state.stock.number,
                            rules: [{ required: true,message:"请输入进货数量"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["num"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"num")}
                    >数量</InputItem>

                    <Picker
                        data={supplierListData}
                        cols={1}
                        {...getFieldProps('supplier', {
                            initialValue: '',
                            rules: [{ required: true,message:"请选择供应商"}],
                        })}
                        className="forss"
                        placeholder="请选择供应商"
                        error={typeof this.state.formError["supplier"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"supplier")}
                        onOk={(val)=>{this.goodsPickerChange(val)}}
                    >
                        <List.Item arrow="horizontal">供应商</List.Item>
                    </Picker>

                   {/* <InputItem
                        {...getFieldProps('model', {
                            initialValue: this.state.stock.contact,
                            rules: [{ required: true,message:"请输入规格说明"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["model"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"model")}
                    >规格说明</InputItem>*/}

                    <List.Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                            onClick={(checked) => { console.log(checked); }}
                        />}
                    >是否付款</List.Item>

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
    shopGoodsList:[],
    supplierList:[],
};
//注入state
const mapStateToProps = (state) => ({
    shopGoodsList:state[stateKey].shopGoodsList,
    supplierList:state[stateKey].supplierList,
});
//注入action
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listShopGoods:actions.listShopGoods,
    listSupplier:actions.listSupplier,
    addStock:actions.addStock,
    /*editStock: actions.editStock,*/
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditFormWrapper);
