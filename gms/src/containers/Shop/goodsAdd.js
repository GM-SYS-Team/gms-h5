import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ImagePicker,Toast } from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;


class GoodsAdd extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            formError:{},
            files: [],
            pictureAddress:""
        }
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                if(this.state.pictureAddress === ""){
                    Toast.info("请上传商品图片");
                    return;
                }
                values.shopId = this.props.params.id;
                values.pictureAddress = this.state.pictureAddress;
                this.props.shopGoodsAdd(values);
            }else{
                this.setState({formError: error})
            }
        });
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message);
        }
    }

    //上传图片
    onChange = (files, type, index) => {
        console.log(files, type, index);
        //TODO 后台的上传图片
        this.setState({
            files:files,
            /*pictureAddress:files[0].url*/

            pictureAddress:"123"
        });

    }

    render(){
        const { getFieldProps } = this.props.form;
        const { files } = this.state;

        return (
            <div className="shop" >

                <TopBar
                    title="新增商品"
                />

                <WhiteSpace/>
                <List renderHeader={() => '新增商品'}  className="link-list">
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

            </div>
        );
    }
}

const GoodsAddFormWrapper = createForm()(GoodsAdd);

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    shopGoodsAdd: actions.shopGoodsAdd
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GoodsAddFormWrapper);
