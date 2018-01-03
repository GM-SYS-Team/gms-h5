import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';
import { browserHistory } from 'react-router'

import { WingBlank,List, InputItem, WhiteSpace, Button, Modal , Toast,Card  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import '../../utils/DateFormat'


const alert = Modal.alert;


/*领取优惠券*/
class Draw extends React.Component{

    componentDidMount(){
        //加载优惠券
        let queryParam = this.props.location.query;
        this.props.getCoupon({
            shopId:queryParam.shopId,
            couponId:queryParam.couponId
        });
    }

    reciveCoupon = () =>{
        //领取
        let queryParam = this.props.location.query;
        if(queryParam.shopId == null || queryParam.couponId == null){
            Toast.info("参数缺失");
            return;
        }
        this.props.reciveCoupon({
            shopId:queryParam.shopId,
            couponId:queryParam.couponId
        },() =>{
            alert('领取成功', '恭喜您领取成功', [
                {
                    text: '立即使用',
                    onPress: () => browserHistory.push("/")
                },{
                    text: '放入卡包',
                    onPress: () => browserHistory.push("/my/coupon")
                },
            ])
        });


    }

    render(){
        let couponData = this.props.couponData;
        let coupon = {};
        let shareCoupon = {};
        if(typeof couponData != "undefined"
            && typeof couponData.couponList != "undefined"
            && typeof couponData.couponList[0] != "undefined"){
            coupon = couponData.couponList[0];
        }
        if(typeof couponData != "undefined" && typeof couponData.shareCoupon != "undefined" && couponData.shareCoupon!= null){
            shareCoupon = couponData.shareCoupon;
        }

        //优惠券
        let couponAmount = "";
        let couponDate = "";
        if(coupon.minAmount != null && coupon.maxAmount ){
            if(coupon.minAmount === coupon.maxAmount){
                couponAmount = coupon.minAmount;
            }else{
                couponAmount = coupon.minAmount +"-"+ coupon.maxAmount;
            }
        }
        let startDate = new Date();
        let endDate = new Date();
        if(typeof coupon.expiryDateStart !== "undefined"){
            startDate = new Date(coupon.expiryDateStart);
        }
        if(typeof coupon.expiryDateStop !== "undefined"){
            endDate = new Date(coupon.expiryDateStop);
        }
        couponDate = startDate.Format("yyyy-MM-dd HH:mm:ss") +"-" + endDate.Format("yyyy-MM-dd HH:mm:ss");

        //共享优惠券
        let sharecouponAmount = "";
        let sharecouponDate = "";
        if(shareCoupon.minAmount != null && shareCoupon.maxAmount ){
            if(shareCoupon.minAmount === shareCoupon.maxAmount){
                sharecouponAmount = shareCoupon.minAmount;
            }else{
                sharecouponAmount = shareCoupon.minAmount +"-"+ shareCoupon.maxAmount;
            }
        }
        let sharestartDate = new Date();
        let shareendDate = new Date();
        if(typeof shareCoupon.expiryDateStart !== "undefined"){
            sharestartDate = new Date(shareCoupon.expiryDateStart);
        }
        if(typeof shareCoupon.expiryDateStop !== "undefined"){
            shareendDate = new Date(shareCoupon.expiryDateStop);
        }
        sharecouponDate = sharestartDate.Format("yyyy-MM-dd HH:mm:ss") +"-" + shareendDate.Format("yyyy-MM-dd HH:mm:ss");

        return (
            <div className="draw">
                <TopBar
                    title="领取优惠券"
                />

                <WingBlank>
                    <WhiteSpace/>
                    <Card style={{backgroundColor:'#d2100b',color:'#fff'}}>
                        <WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:14}}>{coupon.couponName}</span>
                        </WingBlank>
                        <Card.Header
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            title={
                                <div style={{color:"#fff",marginLeft:10}}>
                                    <div style={{fontSize:25}}>￥{couponAmount}</div>
                                    <div style={{fontSize:12,marginTop:5}}>
                                        有效期:{couponDate}</div>
                                </div>
                            }
                        />
                    </Card>
                    <WhiteSpace/>
                    <Card>
                        <Card.Body>
                            <div>使用说明</div>
                            {coupon.info}
                        </Card.Body>
                    </Card>


                    <WhiteSpace/>

                    <Button style={{height:40,lineHeight:"40px"}}
                            type="primary"
                            onClick={this.reciveCoupon}
                    >点击领取</Button>

                    <WhiteSpace/>
                    <WhiteSpace/>
                    <span>共享优惠</span>

                    <Card style={{backgroundColor:'#668ced',color:'#fff'}}>
                        <WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:14}}>{shareCoupon.couponName}</span>
                        </WingBlank>
                        <Card.Header
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            title={
                                <div style={{color:"#fff",marginLeft:10}}>
                                    <div style={{fontSize:25}}>￥{sharecouponAmount}</div>
                                    <div style={{fontSize:12,marginTop:5}}>
                                        有效期:{sharecouponDate}</div>
                                </div>
                            }
                        />
                        {/*<WingBlank>
                            <WhiteSpace/>
                            <span style={{fontSize:12}}>武汉市xxxx产业园</span>
                        </WingBlank>*/}
                    </Card>

                </WingBlank>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "coupon";
export const initialState = {
    couponData:{}
};

//注入state和actions
const mapStateToProps = (state) => ({
    couponData:state[stateKey].couponData
});

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCoupon: actions.getCoupon,
    reciveCoupon: actions.reciveCoupon
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Draw);
