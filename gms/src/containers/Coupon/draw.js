import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Modal , Toast,Card  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";


const alert = Modal.alert;

const showAlert = () => {
    const alertInstance = alert('Delete', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
        { text: 'OK', onPress: () => console.log('ok') },
    ]);
    setTimeout(() => {
        // 可以调用close方法以在外部close
        console.log('auto close');
        alertInstance.close();
    }, 500000);
};


/*领取优惠券*/
class Draw extends React.Component{

    state = {
        name:localStorage.getItem("rememberUserName"),
        password:localStorage.getItem("rememberPassword"),
        rememberPassword: localStorage.getItem("rememberUserName") !== null,
        formError:{}
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message);
        }
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                this.props.login(values);
            }else{
                this.setState({formError: error})
            }
        });
    }


    render(){
        const { getFieldProps } = this.props.form;

        return (
            <div className="draw">
                <TopBar
                    title="领取优惠券"
                />

                <WingBlank>
                    <WhiteSpace/>
                    <Card style={{backgroundColor:'#d2100b',color:'#fff'}}>
                        <WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:14}}>武汉xxx商家</span>
                        </WingBlank>
                        <Card.Header
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            title={
                                <div style={{color:"#fff",marginLeft:10}}>
                                    <div style={{fontSize:25}}>￥100.00</div>
                                    <div style={{fontSize:12,marginTop:5}}>
                                        有效期:2017-10-10 12:20-2017-10-10 12:20</div>
                                </div>
                            }
                        />
                    </Card>
                    <WhiteSpace/>
                    <Card>
                        <Card.Body>
                            <div>使用说明</div>
                            1、优惠券是仅限在乐视商城使用，按面值总额减免支付的优惠码。<br/>
                            2、优惠券分三种：满减券、免邮券、以旧换新优惠券。<br/>
                            3、优惠券获取方式：通过乐视商城的买赠、活动参与等形式获取。
                        </Card.Body>
                    </Card>


                    <WhiteSpace/>

                    <Button style={{height:40,lineHeight:"40px"}} type="primary"
                            onClick={() => alert('领取成功', '恭喜您领取成功', [
                                {
                                    text: '立即使用',
                                    onPress: () => console.log('cancel')
                                },
                                {
                                    text: '放入卡包',
                                    onPress: () => console.log('ok')
                                },
                            ])}
                    >点击领取</Button>

                    <WhiteSpace/>
                    <WhiteSpace/>
                    <span>共享优惠</span>

                    <Card style={{backgroundColor:'#668ced',color:'#fff'}}>
                        <WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:14}}>武汉xxx商家</span>
                        </WingBlank>
                        <Card.Header
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            title={
                                <div style={{color:"#fff",marginLeft:10}}>
                                    <div style={{fontSize:25}}>￥100.00</div>
                                    <div style={{fontSize:12,marginTop:5}}>
                                        有效期:2017-10-10 12:20-2017-10-10 12:20</div>
                                </div>
                            }
                        />
                        <WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:12}}>武汉市xxxx产业园</span>
                        </WingBlank>
                    </Card>

                </WingBlank>

            </div>
        );
    }
}

const DrawFormWrapper = createForm()(Draw);
//组件名和组件初始化状态
export const stateKey = "login";
export const initialState = {
    login: {}
};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    login : actions.login
}, dispatch);
export default connect(null, mapDispatchToProps)(DrawFormWrapper);
