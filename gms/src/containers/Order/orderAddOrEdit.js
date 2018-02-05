import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, Modal,ListView, List,SwipeAction,Flex,Button} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

/*生成订单-选择商品*/
class OrderAddOrEdit extends React.Component{

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
        datas = datas.concat(nextProps.shopGoodsList);
        let footerText = this.state.footerText;
        if(nextProps.shopGoodsList.length == 0){
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
        this.props.listShopGoods({
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
            let goodsItemStyle = {color:"#888",fontSize:14,marginTop:10}
            return (
                <Item
                    align="top"
                    multipleLine>

                    <div style={{overflow:"auto"}}>
                        <div style={{float:"left"}}>
                            <img style={{width:75,height:"auto"}} src={rowData.pictureAddress} alt=""/>
                        </div>
                        <div style={{float:"left",paddingLeft:10,width:"70%"}}>
                            <div>{rowData.name}</div>
                        </div>
                    </div>

                    <div style={{width:"100%"}}>
                        <Flex style={goodsItemStyle}>
                            <Flex.Item>进价：{rowData.purchasingPrice}</Flex.Item>
                            <Flex.Item>售价：{rowData.sellingPrice }</Flex.Item>
                        </Flex>
                        <Flex style={goodsItemStyle}>
                            <Flex.Item>商品品类：{rowData.type}</Flex.Item>
                            <Flex.Item>商品规格：</Flex.Item>
                        </Flex>
                        <Flex style={goodsItemStyle}>
                            <Flex.Item>商品单位：{rowData.unit}</Flex.Item>
                            <Flex.Item>库存量：{rowData.inventoryQuantity }</Flex.Item>
                        </Flex>
                        <Flex style={goodsItemStyle}>
                            <Flex.Item>上次进价：{rowData.last_purchasing_price}</Flex.Item>
                            <Flex.Item>成本均价：</Flex.Item>
                        </Flex>
                    </div>

                </Item>
            );
        };

        let addUrl = "/shop/"+this.props.params.id+"/goodsAdd";

        return (

            <Container className="shop" >

                <TopBar
                    title="选择商品"
                    targetPage={"/shop/detail/"+this.props.params.id}
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
    shopGoodsList:[]
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopGoodsList:state[stateKey].shopGoodsList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listShopGoods:actions.listShopGoods
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderAddOrEdit);
