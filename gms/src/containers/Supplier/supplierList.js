import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import { WhiteSpace, WingBlank, Button, List, ListView, Icon, SearchBar } from 'antd-mobile';
import Container from "../../components/Container/index";
import pinyin from 'pinyin';

import { province } from 'antd-mobile-demo-data';
import { StickyContainer, Sticky } from 'react-sticky';
import 'moment/locale/zh-cn';
import TopBar from "../../components/Container/TopBar";
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

/*供应商列表*/
class SupplierList extends React.Component{

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
        let supplierList = nextProps.supplierList;
        if(typeof supplierList !== "undefined"){
            let dataList = supplierList.rows;

            const dataBlob = {};
            const sectionIDs = [];
            const rowIDs = [];

            dataList.forEach((item, index)=>{
                dataBlob[item.id] = item;
                let itemFirstLetter = pinyin(item.name,{style: pinyin.STYLE_FIRST_LETTER})[0][0].toLocaleUpperCase();
                let hasSection = false;
                sectionIDs.forEach((item, index) => {
                    if(itemFirstLetter == item){
                        hasSection = true;
                    }
                });
                if(!hasSection){
                    sectionIDs.push(itemFirstLetter);
                }
            });

            sectionIDs.forEach((item, index) => {
                dataBlob[item] = item;
                rowIDs[index] = [];
            });

            dataList.forEach((item, index)=>{
                dataBlob[item.id] = item;
                let itemFirstLetter = pinyin(item.name,{style: pinyin.STYLE_FIRST_LETTER})[0][0];
                let sectionIndex = sectionIDs.indexOf(itemFirstLetter.toLocaleUpperCase());
                if(sectionIndex !== -1){
                    rowIDs[sectionIndex].push(item.id);
                }
            });

            this.setState({
               dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            });
        }
    }

    loadingData =()=>{
        this.props.listSupplier({
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
            <Container className="supplier list">

                <TopBar
                    title="供应商管理"
                    rightContent={(
                        <Link to={"/shop/"+this.props.params.id+"/supplier/addOrEdit"}><img style={{width:25}} src={require("./view/add.png")} alt=""/></Link>
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
                        className="am-list sticky-list"
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
                        renderRow={rowData => (<Item extra={rowData.number}>{rowData.name}</Item>)}
                        onQuickSearch={(sectionID,topId)=>{console.log(sectionID)}}
                        quickSearchBarStyle={{
                            top: 150,
                            color:"#999",
                            fontSize:14,
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
export const stateKey = "supplier";
//初始化state
export const initialState = {
    supplierList:[],
};
//注入state
const mapStateToProps = (state) => ({
    supplierList:state[stateKey].supplierList
});
//注入action
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listSupplier:actions.listSupplier
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SupplierList);

