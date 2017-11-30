import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ImagePicker } from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

const data = [/*{
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        id: '2121',
    }, {
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '2122',
    }*/];

class GoodsAdd extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        files: data,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
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
                        {...getFieldProps('bankCard', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入商品名称"
                    >商品名称</InputItem>

                    <InputItem
                        {...getFieldProps('bankCard', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入商品价格"
                    >商品价格</InputItem>

                    <Item>
                        商品图片
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}
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


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GoodsAddFormWrapper);
