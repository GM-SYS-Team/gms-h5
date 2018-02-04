import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ImagePicker,Toast,ActivityIndicator,Picker } from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
import {uploadImg} from "../../utils/ajax";
const Item = List.Item;
const Brief = Item.Brief;


class GoodsAdd extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            formError:{},
            files: [],
            pictureAddress:"",
            loading:false
        }
    }

    componentDidMount(){
        //商品品类
        this.props.listType({
            shopId:this.props.params.id,
        });

        //商品单位
        this.props.listUnit({
            shopId:this.props.params.id,
        });
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                if(this.state.pictureAddress === ""){
                    Toast.info("请上传商品图片",1);
                    return;
                }
                values.shopId = this.props.params.id;
                values.pictureAddress = this.state.pictureAddress;
                values.unit = values.unit[0];
                values.goodsTypeId = values.goodsTypeId[0];
                this.props.shopGoodsAdd(values);
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

    //上传图片
    onChange = (files, type, index) => {
        this.setState({loading:true})
        this.props.uploadGoodsImg(files[0].file,(msg)=>{
            this.setState({
                files:files,
                pictureAddress:msg,
                loading:false
            });
        });
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { files } = this.state;

        //格式化商品单位
        let unitList = this.props.unitList;
        let unitListData = [];
        unitList.forEach((item,index)=>{
            unitListData.push({
                label:item.name,
                value:item.id,
            })
        })

        //格式化商品类型
        let typeList = this.props.typeList;
        let typeListData = [];
        typeList.forEach((item,index)=>{
            typeListData.push({
                label:item.name,
                value:item.id,
            })
        });

        return (
            <Container className="shop" >

                <TopBar
                    title="新增商品"
                />

                <List className="link-list">

                    <InputItem
                        {...getFieldProps('name', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入商品名称"}],
                        })}
                        placeholder="请输入商品名称"
                        error={typeof this.state.formError["name"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"name")}
                    >商品名称</InputItem>

                    <InputItem
                        {...getFieldProps('model', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入商品型号"}],
                        })}
                        placeholder="请输入商品型号"
                        error={typeof this.state.formError["model"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"model")}
                    >商品型号</InputItem>

                    <Picker
                        data={unitListData}
                        cols={1}
                        {...getFieldProps('unit', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入商品单位"}],
                        })}
                        className="forss"
                        placeholder="请输入商品单位"
                        error={typeof this.state.formError["unit"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"unit")}
                    >
                        <List.Item arrow="horizontal">商品单位</List.Item>
                    </Picker>

                    <InputItem
                        {...getFieldProps('purchasingPrice', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入采购价"}],
                        })}
                        type="money"
                        moneyKeyboardAlign="left"
                        placeholder="请输入采购价"
                        error={typeof this.state.formError["purchasingPrice"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"purchasingPrice")}
                    >采购价</InputItem>

                    <InputItem
                        {...getFieldProps('sellingPrice', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入商品价格"}],
                        })}
                        type="money"
                        moneyKeyboardAlign="left"
                        placeholder="请输入商品价格"
                        error={typeof this.state.formError["sellingPrice"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"sellingPrice")}
                    >商品价格</InputItem>

                    <InputItem
                        {...getFieldProps('minNum', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入库存下限"}],
                        })}
                        placeholder="请输入库存下限"
                        error={typeof this.state.formError["minNum"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"minNum")}
                    >库存下限</InputItem>

                    <InputItem
                        {...getFieldProps('inventoryQuantity', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入库存数量"}],
                        })}
                        placeholder="请输入库存数量"
                        error={typeof this.state.formError["inventoryQuantity"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"inventoryQuantity")}
                    >库存数量</InputItem>

                    <Picker
                        data={typeListData}
                        cols={1}
                        {...getFieldProps('goodsTypeId', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入商品品类"}],
                        })}
                        className="forss"
                        placeholder="请输入商品品类"
                        error={typeof this.state.formError["goodsTypeId"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"goodsTypeId")}
                    >
                        <List.Item arrow="horizontal">商品品类</List.Item>
                    </Picker>

                    <Item>
                        商品图片
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                        />
                    </Item>



                </List>

                <WingBlank>
                    <WhiteSpace/>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>确定</Button>
                </WingBlank>

                <ActivityIndicator toast text="上传中..." animating={this.state.loading}/>

            </Container>
        );
    }
}

const GoodsAddFormWrapper = createForm()(GoodsAdd);

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {
    typeList:[],
    unitList:[],
};
//注入state和actions
const mapStateToProps = (state) => ({
    typeList:state[stateKey].typeList,
    unitList:state[stateKey].unitList,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    shopGoodsAdd: actions.shopGoodsAdd,
    uploadGoodsImg: actions.uploadGoodsImg,
    listType: actions.listType,
    listUnit: actions.listUnit,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GoodsAddFormWrapper);
