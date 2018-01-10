import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Checkbox,Flex , Toast ,SegmentedControl,Picker,Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import Areas from "../../components/FormItem/areas";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class Iframe extends React.Component{

    render(){

        return (
            <div className="reg">


                <div style={{width:"100%",overflow:"hide",height:window.screen.height -45}}>

                    <TopBar
                        title="领取优惠券"
                        targetPage="/login"
                    />

                    <iframe style={{width:"100%",height:"100%",border:0}} src="https://h5.youzan.com/v2/ump/promocard/fetch?alias=13ct9s2fh"></iframe>
                </div>


            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "login";
export const initialState = {

};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(null, mapDispatchToProps)(Iframe);
