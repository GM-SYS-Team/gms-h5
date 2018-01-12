import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Button, List,ListView} from 'antd-mobile';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class Manager extends React.Component{

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
            pageSize:30
        };
    }

    componentDidMount(){
        this.loadingData();
    }

    componentWillReceiveProps(nextProps){
        //为数据源增加数据
        let datas = this.state.pageData;
        datas = datas.concat(nextProps.shopList);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datas),
            pageData:datas,
            isLoading: false,
        });
    }

    //加载列表数据
    loadingData = () =>{
        //加载用户店铺列表
        this.props.loadingShopList({
            page:this.state.pageNum,
            rows:this.state.pageSize
        });
    }

    //到达底部
    onEndReached = () =>{
        let pageNum =  this.state.pageNum;
        pageNum++;
        console.log(pageNum);
        this.setState({pageNum: pageNum});
        this.loadingData();
    }

    render(){

        //渲染每一行数据
        const row = (rowData, sectionID, rowID) => {
            let shopUrl = "/shop/detail/"+rowData.id;
            return (
                <Link to={shopUrl}>
                    <Item arrow="horizontal" onClick={() => {}}>{rowData.shopName}</Item>
                </Link>
            );
        };

        let targetPage = this.props.location.query.targetPage;
        if(typeof targetPage === "undefined" ||  targetPage == null){
            targetPage = "/youzhuanbei";
        }else{
            if(targetPage == "refer"){
                targetPage = "/?selectedTab=dingdan";
            }
        }

        return (
            <div className="shop" >

                <TopBar
                    title="店铺管理"
                    targetPage={targetPage}
                    rightContent={(
                        <Link to="/shop/add">新增</Link>
                    )}
                />

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>店铺列表</span>}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? '加载中' : '加载完成'}
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
            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "shop";
export const initialState = {
    shopList:[],
};

//注入state和actions
const mapStateToProps = (state) => ({
    shopList:state[stateKey].shopList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadingShopList:actions.loadingShopList
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Manager);

