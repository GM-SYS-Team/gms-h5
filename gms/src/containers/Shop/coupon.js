import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Tabs, List,Button,Badge,ListView, Toast } from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
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
        Toast.hide();
    }

    //加载列表数据
    loadingData = (state) =>{
        state++;
        //加载用户店铺列表
        this.props.listCoupon({
            shopId:this.props.params.id,
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

        Toast.loading('加载中...', 1000);

        //清空数据
        this.setState({tabIndex:index,
            pageData0:[],
            pageData1:[],
            pageData2:[],});
        //加载数据
        this.loadingData(index);
    }

    shareCoupon = (couponId) =>{
        this.props.shareCoupon({
            shopId:this.props.params.id,
            couponId:couponId
        });
    }

    render(){

        let couponStyle = {
            position: "relative",
           /* backgroundColor:"#ff5150",*/
            color:"#333"
        }
        let couponImg ={
            width:"100%",
            height:"auto",
        }
        let couponDiv1 = {
            position: "absolute",
            top:"22%",
            left:"10%",
            fontSize:18,
            fontWeight:"bold",
        }
        let couponDiv2 = {
            position: "absolute",
            top:"25%",
            right:"15%",
            fontSize:22
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
            if(rowData.minAmount != null && rowData.maxAmount ){
                if(rowData.minAmount === rowData.maxAmount){
                    amount = rowData.minAmount;
                }else{
                    amount = rowData.minAmount +"-"+ rowData.maxAmount;
                }
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={rowData.quickMark} alt=""/>
                        <div style={couponDiv1}>{rowData.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数/次数： {rowData.totalCount - rowData.remainCount}/{rowData.totalCount}</div>
                            <div>已使用： {rowData.totalCount - rowData.remainCount}</div>
                        </div>
                    </div>
                </Item>
            );
        };

        const row2 = (rowData, sectionID, rowID) => {
            //面值展示
            let amount = "";
            if(rowData.minAmount != null && rowData.maxAmount ){
                if(rowData.minAmount === rowData.maxAmount){
                    amount = rowData.minAmount;
                }else{
                    amount = rowData.minAmount +"-"+ rowData.maxAmount;
                }
            }
            //共享
            let shared = true;
            if(typeof rowData.status === "undefined" ||  rowData.status == null){
                shared = false;
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={rowData.quickMark} alt=""/>
                        <div style={couponDiv1}>{rowData.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数/次数： {rowData.totalCount - rowData.remainCount}/{rowData.totalCount}</div>
                            <div>已使用： {rowData.totalCount - rowData.remainCount}</div>
                        </div>
                    </div>

                    <div style={{textAlign:"right"}}>
                        <WhiteSpace/>
                        <Button disabled={shared} type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={this.shareCoupon.bind(this,rowData.id)}>共享该优惠券</Button>
                    </div>

                </Item>
            );
        };

        const row3 = (rowData, sectionID, rowID) => {
            //面值展示
            let amount = "";
            if(rowData.minAmount != null && rowData.maxAmount ){
                if(rowData.minAmount === rowData.maxAmount){
                    amount = rowData.minAmount;
                }else{
                    amount = rowData.minAmount +"-"+ rowData.maxAmount;
                }
            }
            return (
                <Item>
                    <div style={couponStyle}>
                        <img style={couponImg} src={rowData.quickMark} alt=""/>
                        <div style={couponDiv1}>{rowData.couponName}</div>
                        <div style={couponDiv2}>￥{amount}</div>
                        <div style={couponDiv3}>
                            <div>领取人数/次数： {rowData.totalCount - rowData.remainCount}/{rowData.totalCount}</div>
                            <div>已使用： {rowData.totalCount - rowData.remainCount}</div>
                        </div>
                    </div>
                </Item>
            );
        };

        let urlAdd = "/shop/"+this.props.params.id+"/couponAdd";

        return (
            <Container className="coupon" >

                <TopBar
                    title="优惠券"
                    rightContent={(
                        <Link to={urlAdd}>添加</Link>
                    )}
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

            </Container>
        );
    }
}

const CouponFormWrapper = createForm()(Coupon);

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {
    couponList:[]
};

//注入state和actions
const mapStateToProps = (state) => ({
    couponList:state[stateKey].couponList
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    listCoupon: actions.listCoupon,
    shareCoupon: actions.shareCoupon
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CouponFormWrapper);
