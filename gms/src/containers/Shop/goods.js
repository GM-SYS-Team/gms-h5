import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, Modal,ListView, List,SwipeAction,Toast} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class Goods extends React.Component{

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

    //删除商品
    delGoods = (goodsId) =>{
        //删除
        this.props.delShopGoods({goodsId:goodsId,shopId:this.props.params.id},() => {
            //成功回调，从新加载数据
            this.setState({
                pageData:[],
                pageNum: 1
            });
            this.loadingData();
        });
    }

    render(){

        //渲染每一行数据
        const row = (rowData, sectionID, rowID) => {
            return (
                <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                        {
                            text: '删除',
                            onPress: () => {
                                alert('删除', '确定要删除商品'+rowData.name+'吗？', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    {
                                        text: '确定',
                                        onPress: () => new Promise((resolve) => {
                                            this.delGoods(rowData.id);
                                            resolve();
                                        }),
                                    },
                                ])
                            },
                            style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                >
                    <Item
                        align="top"
                        thumb={rowData.pictureAddress}
                        multipleLine>
                        {rowData.name}
                        <Brief>￥{rowData.sellingPrice}</Brief>
                    </Item>
                </SwipeAction>
            );
        };

        let addUrl = "/shop/"+this.props.params.id+"/goodsAdd";

        return (

            <div className="shop" >

                <TopBar
                    title="商品管理"
                    rightContent={(
                        <Link to={addUrl}>新增</Link>
                    )}
                />

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>商品列表</span>}
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


               {/* <List renderHeader={() => '商品列表'} className="link-list">


                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}>
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>


                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    >
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>

                    <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => console.log('delete'),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                    >
                        <Item
                            align="top"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine>
                            商品1
                            <Brief>￥1.00</Brief>
                        </Item>
                    </SwipeAction>

                </List>*/}

            </div>
        );
    }
}

const GoodsFormWrapper = createForm()(Goods);

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
    delShopGoods: actions.delShopGoods
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GoodsFormWrapper);
