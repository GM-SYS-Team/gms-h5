import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {WhiteSpace, WingBlank,Tabs, List,Button,Badge } from 'antd-mobile';
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
    }



    render(){
        const { getFieldProps } = this.props.form;

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

        return (
            <div className="coupon" >

                <TopBar
                    title="优惠券"
                    rightContent={(
                        <Link to="/shop/1/couponAdd">添加</Link>
                    )}
                />

                <Tabs tabs={tabs}
                      initialPage={0}
                      onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >

                    <div>
                        <List className="link-list">

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                            </Item>

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                            </Item>

                        </List>
                    </div>

                    <div>
                        <List className="link-list">

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                                <div style={{textAlign:"right"}}>
                                    <WhiteSpace/>
                                    <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>共享该优惠券</Button>
                                </div>
                            </Item>

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                                <div style={{textAlign:"right"}}>
                                    <WhiteSpace/>
                                    <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>共享该优惠券</Button>
                                </div>
                            </Item>

                        </List>
                    </div>

                    <div>
                        <List className="link-list">

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back_g.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                            </Item>

                            <Item>
                                <div style={couponStyle}>
                                    <img style={couponImg} src={require('./view/coupon_back_g.png')} alt=""/>
                                    <div style={couponDiv1}>武汉xxxx</div>
                                    <div style={couponDiv2}>￥100</div>
                                    <div style={couponDiv3}>
                                        <div>领取人数/次数： 1/1</div>
                                        <div>已使用： 2</div>
                                    </div>
                                </div>
                            </Item>

                        </List>
                    </div>

                </Tabs>

            </div>
        );
    }
}

const CouponFormWrapper = createForm()(Coupon);

//组件名和组件初始化状态
export const stateKey = "my";
export const initialState = {


};

//注入state和actions
const mapStateToProps = (state) => ({


});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CouponFormWrapper);
