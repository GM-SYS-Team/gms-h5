import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

class Add extends React.Component{

    constructor(props) {
        super(props);
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
                        {...getFieldProps('bankCard', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入店铺名称"
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
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddFormWrapper);
