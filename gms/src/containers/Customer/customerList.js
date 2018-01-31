import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import { WhiteSpace, WingBlank, Modal, List, ListView, SwipeAction, SearchBar } from 'antd-mobile';
import Container from "../../components/Container/index";
import pinyin from 'pinyin';
import {groupSectionAndRows} from "../../components/ArrayData/group";

import { province } from 'antd-mobile-demo-data';
import { StickyContainer, Sticky } from 'react-sticky';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

/*客户列表*/
class CustomerList extends React.Component{

    constructor(props) {
        super(props);

        //区域数据，行数据，数据源
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        const dataSource = new ListView.DataSource({
            getSectionHeaderData: getSectionData,
            getRowData,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            inputValue: "",
        };
    }

    componentDidMount() {
        this.loadingData();
    }

    componentWillReceiveProps(nextProps){
        let customerList = nextProps.customerList;
        if(typeof customerList !== "undefined"){
            let dataList = customerList.rows;
            this.setState({
               dataSource: groupSectionAndRows(this.state.dataSource,dataList)
            });
        }
    }

    loadingData =()=>{
        this.props.listCustomer({
            page:1,
            rows:1000,
            shopId:this.props.params.id
        });
    }

    onSearch = (val) => {
        const pd = { ...province };
        Object.keys(pd).forEach((item) => {
            const arr = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
            if (!arr.length) {
                delete pd[item];
            } else {
                pd[item] = arr;
            }
        });
        this.setState({
            inputValue: val,
            /*dataSource: genData(this.state.dataSource, pd),*/
        });
    }

    render(){

        return (
            <Container className="customer list">

                <TopBar
                    title="客户管理"
                    targetPage={"/shop/detail/"+this.props.params.id}
                    rightContent={(
                        <Link to={"/shop/"+this.props.params.id+"/customer/addOrEdit"}><img style={{width:25}} src={require("../../resource/add.png")} alt=""/></Link>
                    )}
                />

                <div style={{ paddingTop: '45px', position: 'relative' }}>

                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                        <SearchBar
                            value={this.state.inputValue}
                            placeholder="搜索"
                            onChange={this.onSearch}
                            onClear={() => { console.log('onClear'); }}
                            onCancel={() => { console.log('onCancel'); }}
                        />
                    </div>

                    <ListView.IndexedList
                        dataSource={this.state.dataSource}
                        className="am-list sticky-list link-list"
                        useBodyScroll
                        renderSectionWrapper={sectionID => (
                            <StickyContainer
                                key={`s_${sectionID}_c`}
                                className="sticky-container"
                                style={{ zIndex: 4 }}
                            />
                        )}
                        renderSectionHeader={sectionData => (
                            <Sticky>
                                {({
                                      style,
                                  }) => (
                                    <div
                                        className="sticky"
                                        style={{
                                            ...style,
                                            zIndex: 3,
                                            color: '#888',
                                        }}
                                    >{sectionData}</div>
                                )}
                            </Sticky>
                        )}
                        renderFooter={() => <span></span>}
                        renderRow={rowData => (
                            <SwipeAction
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '编辑',
                                        onPress: () => {
                                            localStorage.setItem("currentCustomer",JSON.stringify(rowData));
                                            browserHistory.push("/shop/"+this.props.params.id+"/customer/addOrEdit")
                                        },
                                        style: { backgroundColor: '#108ee9', color: 'white' },
                                    },
                                    {
                                        text: '删除',
                                        onPress: () => {
                                            alert('删除', '确定要删除客户'+rowData.name+"吗？", [
                                                { text: '取消', onPress: () => {}, style: 'default' },
                                                { text: '确定', onPress: () => {
                                                    this.props.delCustomer({
                                                        shopId:this.props.params.id,
                                                        id:rowData.id
                                                    })
                                                } },
                                            ]);
                                        },
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                            >
                                <Item extra={rowData.number}>{rowData.name}</Item>
                            </SwipeAction>
                        )}
                        quickSearchBarTop={{}}
                        quickSearchBarStyle={{
                            top: "30%",
                            color:"#999",
                            fontSize:12,
                            zIndex:5
                        }}
                        delayTime={10}
                        delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
                    />

                </div>
            </Container>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "customer";
//初始化state
export const initialState = {
    customerList:[],
};
//注入state
const mapStateToProps = (state) => ({
    customerList:state[stateKey].customerList
});
//注入action
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listCustomer:actions.listCustomer,
    delCustomer: actions.delCustomer
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);

