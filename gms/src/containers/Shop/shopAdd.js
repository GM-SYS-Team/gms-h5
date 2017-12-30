import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,Toast} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

class Add extends React.Component{

    state = {
        formError:{}
    }

    constructor(props) {
        super(props);
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                this.props.shopAdd(values);
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

    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="shop" >

                <TopBar
                    title="店铺管理"
                />

                <List renderHeader={() => '新增'} className="link-list">
                    <InputItem
                        {...getFieldProps('shopName', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入店铺名称"}],
                        })}
                        placeholder="请输入店铺名称"
                        error={typeof this.state.formError["shopName"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"shopName")}
                    >店铺名称</InputItem>
                </List>

                <WingBlank>
                    <WhiteSpace/>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>确定</Button>
                </WingBlank>

            </div>
        );
    }
}

const AddFormWrapper = createForm()(Add);

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {

};

//注入state和actions
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    shopAdd: actions.shopAdd
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddFormWrapper);
