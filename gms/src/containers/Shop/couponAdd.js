import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,InputItem,ActionSheet,Modal,DatePicker,TextareaItem,Picker} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

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
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}
function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr} ${timeStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
    <div
        onClick={onClick}
        style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
    >
        {children}
        <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    </div>
);


class couponAdd extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    showActionSheet = () => {
        const BUTTONS = ['固定面值', '随机面值', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                message: '请选择面值类型',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
                if(buttonIndex === 0){
                    prompt('固定面值', '请输入固定面值', [
                        { text: '取消' },
                        { text: '确定', onPress: value => console.log(`输入的内容:${value}`) },
                    ], 'plain-text', '');
                }else{
                    alert('随机面值', (
                        <List>
                            <InputItem
                                placeholder="请输入"
                                clear
                                moneyKeyboardAlign="left"
                            >最小面额</InputItem>

                            <InputItem
                                placeholder="请输入"
                                clear
                                moneyKeyboardAlign="left"
                            >最大面额</InputItem>

                        </List>
                    ), [
                        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                        { text: '确定', onPress: () => console.log('ok') },
                    ])
                }

            });
    }

    render(){
        const { getFieldProps } = this.props.form;


        return (
            <div className="shop" >

                <TopBar
                    title="新增优惠券"
                />

                <List renderHeader={() => '基本信息'} className="link-list">
                    <InputItem
                        {...getFieldProps('bankCard', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入优惠券名称"
                    >优惠券名称</InputItem>

                    <InputItem
                        {...getFieldProps('bankCard', {
                            initialValue: '',
                        })}
                        type="bankCard"
                        placeholder="请输入发放总量"
                    >发放总量</InputItem>

                    <Item arrow="horizontal" onClick={this.showActionSheet}>面值</Item>
                </List>

                <List renderHeader={() => '设置时间'} className="link-list">

                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">生效时间</List.Item>
                    </DatePicker>

                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">过期时间</List.Item>
                    </DatePicker>
                </List>

                <List renderHeader={() => '商品设置 '} className="link-list">

                    <Picker data={
                        [
                            {
                                label: '百事可乐',
                                value: '百事可乐',
                            },
                            {
                                label: '可口可乐',
                                value: '可口可乐',
                            },
                        ]
                    } cols={1} {...getFieldProps('district3')} className="forss">
                        <List.Item arrow="horizontal">可使用商品</List.Item>
                    </Picker>

                    <TextareaItem
                        {...getFieldProps('note3')}
                        title="使用说明"
                        placeholder="请输入使用说明"
                        autoHeight
                        labelNumber={5}
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
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(couponAddFormWrapper);
