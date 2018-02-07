import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {WingBlank,WhiteSpace, Modal,ListView, List,SwipeAction,Flex,Button} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

/*库存列表*/
class OrderList extends React.Component{

    constructor(props) {
        super(props);

        //定义数据源
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        //设置state
        this.state = {
            dataSource,
            isLoading: true,
            pageData:[],
            pageNum:1,
            pageSize:30,
            footerText:"加载完成"
        };
    }

    componentDidMount(){
        this.loadingData();
    }

    componentWillReceiveProps(nextProps){
        //为数据源增加数据
        let datas = this.state.pageData;
        datas = datas.concat(nextProps.shopOrderList);
        let footerText = this.state.footerText;
        if(nextProps.shopOrderList.length == 0){
            footerText = "没有更多数据";
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datas),
            pageData:datas,
            isLoading: false,
            footerText: footerText
        });
    }

    //加载列表数据
    loadingData = () =>{
        //加载用户店铺列表
        this.props.listShopOrder({
            shopId:this.props.params.id,
            page:this.state.pageNum,
            rows:this.state.pageSize
        });
    }

    //到达底部
    onEndReached = () =>{
        let pageNum =  this.state.pageNum;
        pageNum++;
        this.setState({pageNum: pageNum});
        this.loadingData();
    }

    render(){

        //渲染每一行数据
        const row = (rowData, sectionID, rowID) => {
            let goodsItemStyle = {fontSize:14,marginTop:5}
            let typeName = "";
            if(typeof rowData.type !== "undefined" && rowData.type !=null){
                typeName = rowData.type.name;
            }

            //循环商品
            let goodsItemPage = [];
            rowData.saleListGoodsList.forEach((item,index)=>{
                goodsItemPage.push(
                    <div style={{width:"100%", borderBottom:"1px solid #e9e9e9",padding:"10px 0"}}>
                        <div style={{}}>{item.name}</div>
                        <Flex style={goodsItemStyle}>
                            <Flex.Item>销售价：{item.price}</Flex.Item>
                            <Flex.Item>总金额：{item.total }</Flex.Item>
                            <Flex.Item>数量：{item.num }</Flex.Item>
                        </Flex>
                    </div>
                );
            });

            return (
                <div>
                    <Item
                        align="top"
                        multipleLine
                        onClick={()=>{
                            browserHistory.push("/shop/"+this.props.params.id+"/order/"+rowData.id+"/detail");
                        }}
                    >

                        <div style={{
                            overflow:"auto",
                            borderBottom:"1px solid #e9e9e9",
                            fontSize:14,
                            color:"#888",
                            paddingBottom:7
                        }}>
                            <div style={{float:"left"}}>{rowData.saleDate}</div>
                            <div style={{float:"right"}}>{rowData.saleNumber}</div>
                        </div>
                        {goodsItemPage}
                        {/*销售备注：*/}
                    </Item>

                    <div style={{
                        backgroundColor:"#f5f5f9",
                        color:"#f5f5f9",
                        width:"100%",
                        height:10
                    }}>.</div>
                </div>

            );
        };

        return (

            <Container className="shop" >

                <TopBar
                    title="订单列表"
                    targetPage={"/shop/detail/"+this.props.params.id}
                    rightContent={(
                        <Link to={"/shop/"+this.props.params.id+"/order/addGoods"}><img style={{width:25}} src={require("../../resource/add.png")} alt=""/></Link>
                    )}
                />

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? '加载中' : this.state.footerText}
                        </div>
                    )}
                    renderRow={row}
                    className="link-list"
                    pageSize={10}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />

            </Container>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "order";
export const initialState = {
    shopOrderList:[]
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopOrderList:state[stateKey].shopOrderList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listShopOrder:actions.listShopOrder,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
