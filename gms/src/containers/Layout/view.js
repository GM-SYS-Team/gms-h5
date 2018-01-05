import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {TabBar } from 'antd-mobile';
import SalesView from '../Index/view';
import OrderView from '../My/center';

class Layout extends React.Component{

    constructor(props) {
        super(props);

        //设置默认的tab页面
        let selectedTab = "gailan";
        let savedSelectedTab = localStorage.getItem("selectedTab");
        if(typeof savedSelectedTab !== "undefined"){
            selectedTab = savedSelectedTab;
        }

        let st = this.props.location.query.selectedTab;
        if(typeof st !== "undefined" && st !== null){
            localStorage.setItem("selectedTab",st);
            selectedTab = st;
        }else{
            localStorage.removeItem("selectedTab");
            selectedTab = st;
        }

        this.state = {
            selectedTab: selectedTab
        };
    }



    setSelectedTab = (selectedTab) =>{
        this.setState({selectedTab:selectedTab});
        localStorage.setItem("selectedTab",selectedTab);
    }

    render(){

        return (
            <div className="layout" >

                {/*底部导航栏*/}
                <div className="bottom-tabs" style={{position: 'fixed',height: '100%', width: '100%', top: 0, left: 0,  overflowScrolling: 'touch'}}>


                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#e10231"
                        barTintColor="white">

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/gailan.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/gailan_a.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="首页"
                            key="gailan"
                            selected={this.state.selectedTab === "gailan"}
                            onPress={this.setSelectedTab.bind(this,"gailan")}
                        >
                            <SalesView />

                        </TabBar.Item>

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/shebei.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/shebei_a.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="扫码"
                            key="shebei"
                            selected={this.state.selectedTab === "shebei"}
                            onPress={this.setSelectedTab.bind(this,"shebei")}
                        >
                            <SalesView/>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/order.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+require('./view/order_a.svg')+') center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="个人"
                            key="dingdan"
                            selected={this.state.selectedTab === "dingdan"}
                            onPress={this.setSelectedTab.bind(this,"dingdan")}
                        >
                            <OrderView/>
                        </TabBar.Item>

                    </TabBar>
                </div>


            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "layout";
export const initialState = {

};

//注入state和actions
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
