import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ActionSheet,Modal,DatePicker,Toast,TextareaItem,Picker} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import DateFormat from '../../utils/DateFormat';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;
const alert = Modal.alert;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class couponAdd extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            formError:{},

            startDate:now,
            endDate:now,
            maxAmount:null,
            minAmount:null,
        }
    }

    componentDidMount(){
        //商品列表
        this.props.listShopGoods({
            shopId:this.props.params.id,
            page:1,
            rows:100
        })
    }

    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({formError: {}})
                values.shopId = this.props.params.id;
                if(this.state.maxAmount === null){
                    Toast.info("请选择面值",1);
                    return;
                }
                values.goodsId = values.goodsId[0];
                values.expiryDateStart = this.state.startDate.Format("yyyy-MM-dd HH:mm") ;
                values.expiryDateStop = this.state.endDate.Format("yyyy-MM-dd HH:mm") ;
                values.maxAmount = this.state.maxAmount;
                values.minAmount = this.state.minAmount;
                this.props.couponAdd(values);
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

    //面值选择
    showActionSheet = () => {
        const BUTTONS = ['固定面值', '随机面值', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                message: '请选择面值类型',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },(buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
                if(buttonIndex === 0){
                    prompt('固定面值', '请输入固定面值', [
                        { text: '取消' },
                        { text: '确定', onPress: value => this.setState({maxAmount:value,minAmount:value}) },
                    ], 'plain-text', '');
                }else if(buttonIndex === 1){
                    alert('随机面值', (
                        <List>
                            <InputItem
                                placeholder="请输入"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={(value) => { this.setState({minAmount:value}) }}
                            >最小面额</InputItem>

                            <InputItem
                                placeholder="请输入"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={(value) => { this.setState({maxAmount:value}) }}
                            >最大面额</InputItem>
                        </List>
                    ), [
                        { text: '取消', onPress: () => this.setState({minAmount:null,maxAmount:null}), style: 'default' },
                        { text: '确定', onPress: () => console.log('ok') },
                    ])
                }

            });
    }

    render(){
        const { getFieldProps } = this.props.form;

        //面值展示
        let amount = "";
        if(this.state.minAmount != null && this.state.maxAmount ){
            if(this.state.minAmount === this.state.maxAmount){
                amount = this.state.minAmount;
            }else{
                amount = this.state.minAmount +"-"+ this.state.maxAmount;
            }
        }

        //商品列表
        let shopGoodsList = this.props.shopGoodsList;
        let goodsData = [];
        if(typeof shopGoodsList !== "undefined" && shopGoodsList.length > 0){
            for (let i = 0;i< shopGoodsList.length;i++){
                let goodsItem = shopGoodsList[i];
                let goodsObj = {
                    label: goodsItem.name,
                    value: goodsItem.id,
                }
                goodsData.push(goodsObj);
            }
        }

        return (
            <div className="shop" >

                <TopBar
                    title="新增优惠券"
                />

                <WhiteSpace/>
                <List renderHeader={() => '基本信息'} className="link-list">
                    <InputItem
                        {...getFieldProps('couponName', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入优惠券名称"}],
                        })}
                        placeholder="请输入优惠券名称"
                        error={typeof this.state.formError["couponName"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"couponName")}
                    >优惠券名称</InputItem>

                    <InputItem
                        {...getFieldProps('totalCount', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入发放总量"}],
                        })}
                        type="number"
                        placeholder="请输入发放总量"
                        error={typeof this.state.formError["totalCount"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"totalCount")}
                    >发放总量</InputItem>

                    <Item arrow="horizontal" extra={amount} onClick={this.showActionSheet}>面值</Item>
                </List>

                <List renderHeader={() => '设置时间'} className="link-list">

                    <DatePicker
                        value={this.state.startDate}
                        onChange={date => this.setState({ startDate:date})}
                    >
                        <List.Item arrow="horizontal">生效时间</List.Item>
                    </DatePicker>

                    <DatePicker
                        value={this.state.endDate}
                        onChange={date => this.setState({ endDate:date })}
                    >
                        <List.Item arrow="horizontal">过期时间</List.Item>
                    </DatePicker>
                </List>

                <List renderHeader={() => '商品设置 '} className="link-list">
                    <Picker data={goodsData}
                            cols={1}
                            {...getFieldProps('goodsId',{
                                initialValue: '',
                                rules: [{ required: true,message:"请选择可使用商品"}],
                            })}
                            className="forss"
                            error={typeof this.state.formError["goodsId"] !== "undefined"}
                            onErrorClick={this.onErrorClick.bind(this,"goodsId")}
                            >
                        <List.Item arrow="horizontal">可使用商品</List.Item>
                    </Picker>

                    <TextareaItem
                        {...getFieldProps('couponInfo',{
                            initialValue: '',
                            rules: [{ required: false,message:"请输入使用说明"}],
                        })}
                        title="使用说明"
                        placeholder="请输入使用说明"
                        autoHeight
                        labelNumber={5}
                        error={typeof this.state.formError["couponInfo"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"couponInfo")}
                    />

                </List>

                <WingBlank>
                    <WhiteSpace/>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>发放</Button>
                </WingBlank>

            </div>
        );
    }
}

const couponAddFormWrapper = createForm()(couponAdd);

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {
    shopGoodsList:[]
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopGoodsList:state[stateKey].shopGoodsList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listShopGoods:actions.listShopGoods,
    couponAdd: actions.couponAdd
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(couponAddFormWrapper);
