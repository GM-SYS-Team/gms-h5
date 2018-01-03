import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Tabs, List,Button,Badge,ListView } from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

const tabs = [
    { title: <Badge>未开始</Badge> },
    { title: <Badge>进行中</Badge> },
    { title: <Badge>已失效</Badge> },
];



class Coupon extends React.Component{

    constructor(props) {
        super(props);

        //定义数据源
        const dataSource0 = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const dataSource1 = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const dataSource2 = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        //设置state
        this.state = {
            tabIndex:0,
            dataSource0,
            dataSource1,
            dataSource2,
            isLoading: true,
            pageData0:[],
            pageData1:[],
            pageData2:[],
            pageNum0:1,
            pageNum1:1,
            pageNum2:1,
            pageSize:30,
            footerText:"加载完成"
        };
    }

    componentDidMount(){
        this.loadingData(this.state.tabIndex);
    }

    componentWillReceiveProps(nextProps){
        let tabIndex = this.state.tabIndex;
        //为数据源增加数据
        let datas = this.state["pageData"+tabIndex];
        if(this.state["pageNum"+tabIndex] === 1){
            datas = [];
        }
        datas = datas.concat(nextProps.couponList);
        let footerText = this.state.footerText;
        if(nextProps.couponList.length == 0){
            footerText = "没有更多数据";
        }
        this.setState({
            ["dataSource"+tabIndex]: this.state["dataSource"+tabIndex].cloneWithRows(datas),
            ["pageData"+tabIndex]:datas,
            isLoading: false,
            footerText: footerText
        });
    }

    //加载列表数据
    loadingData = (state) =>{
        state++;
        //加载用户店铺列表
        this.props.listCoupon({
            state:state,
            page:this.state["pageNum"+this.state.tabIndex],
            rows:this.state.pageSize
        });
    }

    //到达底部
    onEndReached = () =>{
        let pageNum = this.state["pageNum"+this.state.tabIndex];
        pageNum++;
        this.setState({["pageNum"+this.state.tabIndex]: pageNum});
        this.loadingData(this.state.tabIndex);
    }

    //tab页面
    tabChange = (index,tab) =>{
        this.setState({tabIndex:index});
        //加载数据
        this.loadingData(index);
    }

    render(){

        let couponStyle = {
            position: "relative",
            color:"#fff"
        }
        let couponImg ={
            width:"100%",
            height:"auto",
        }
        let couponDiv1 = {
            position: "absolute",
            top:"22%",
            left:"10%",
        }
        let couponDiv2 = {
            position: "absolute",
            top:"33%",
            right:"10%",
            fontSize:20
        }
        let couponDiv3 = {
            position: "absolute",
            top:"55%",
            left:"10%",
        }

        //渲染每一行数据
        const row1 = (rowData, sectionID, rowID) => {
            //面值展示
            let amount = "";
            if(rowData.coupon.minAmount != null && rowData.coupon.maxAmount ){
                if(rowData.coupon.minAmount === rowData.coupon.maxAmount){
                    amount = rowData.coupon.minAmount;
                }else{
                    amount = rowData.coupon.minAmount +"-"+ rowData.coupon.maxAmount;
                }
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                        <div style={couponDiv1}>{rowData.coupon.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数：{rowData.coupon.totalCount - rowData.coupon.remainCount}</div>
                            <div>已使用：{rowData.isUsed}</div>
                        </div>
                    </div>
                </Item>
            );
        };

        const row2 = (rowData, sectionID, rowID) => {
            //面值展示
            let amount = "";
            if(rowData.coupon.minAmount != null && rowData.coupon.maxAmount ){
                if(rowData.coupon.minAmount === rowData.coupon.maxAmount){
                    amount = rowData.coupon.minAmount;
                }else{
                    amount = rowData.coupon.minAmount +"-"+ rowData.coupon.maxAmount;
                }
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                        <div style={couponDiv1}>{rowData.coupon.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数：{rowData.coupon.totalCount - rowData.coupon.remainCount}</div>
                            <div>已使用：{rowData.isUsed}</div>
                        </div>
                    </div>
                </Item>
            );
        };

        const row3 = (rowData, sectionID, rowID) => {
            //面值展示
            let amount = "";
            if(rowData.coupon.minAmount != null && rowData.coupon.maxAmount ){
                if(rowData.coupon.minAmount === rowData.coupon.maxAmount){
                    amount = rowData.coupon.minAmount;
                }else{
                    amount = rowData.coupon.minAmount +"-"+ rowData.coupon.maxAmount;
                }
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                        <div style={couponDiv1}>{rowData.coupon.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数：{rowData.coupon.totalCount - rowData.coupon.remainCount}</div>
                            <div>已使用：{rowData.isUsed}</div>
                        </div>
                    </div>
                </Item>
            );
        };


        return (
            <div className="coupon" >

                <TopBar
                    title="优惠券"
                />

                <Tabs tabs={tabs}
                      initialPage={0}
                      onChange={(tab, index) => { this.tabChange( index, tab); }}>

                    <div>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource0}
                            renderFooter={() => (
                                <div style={{ padding: 30, textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中' : this.state.footerText}
                                </div>
                            )}
                            renderRow={row1}
                            className="link-list"
                            pageSize={10}
                            useBodyScroll
                            onScroll={() => { console.log('scroll'); }}
                            scrollRenderAheadDistance={500}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}
                        />
                    </div>

                    <div>


                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource1}
                            renderFooter={() => (
                                <div style={{ padding: 30, textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中' : this.state.footerText}
                                </div>
                            )}
                            renderRow={row2}
                            className="link-list"
                            pageSize={10}
                            useBodyScroll
                            onScroll={() => { console.log('scroll'); }}
                            scrollRenderAheadDistance={500}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}
                        />

                    </div>

                    <div>

                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource2}
                            renderFooter={() => (
                                <div style={{ padding: 30, textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中' : this.state.footerText}
                                </div>
                            )}
                            renderRow={row3}
                            className="link-list"
                            pageSize={10}
                            useBodyScroll
                            onScroll={() => { console.log('scroll'); }}
                            scrollRenderAheadDistance={500}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}
                        />

                    </div>

                </Tabs>

            </div>
        );
    }
}

const CouponFormWrapper = createForm()(Coupon);

//组件名和组件初始化状态
export const stateKey = "coupon";
export const initialState = {
    couponList:[]
};

//注入state和actions
const mapStateToProps = (state) => ({
    couponList:state[stateKey].couponList
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    listCoupon: actions.listCoupon
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CouponFormWrapper);
