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
import {getCookie, resetCookieExpireDate} from "../../utils/cookie";


const alert = Modal.alert;


/*领取优惠券*/
class Draw extends React.Component{

    constructor(props) {
        super(props);

        //使用
        const userToken = getCookie("userToken");
        if(typeof userToken === "undefined" || userToken === null){
            browserHistory.push("/login");
        }

        this.state = {
            showMainPart:true,
            showSharePart:false
        }
    }

    componentDidMount(){
        //加载优惠券
        let queryParam = this.props.location.query;
        this.props.getCoupon({
            shopId:queryParam.shopId,
            couponId:queryParam.couponId
        });
    }

    reciveCoupon = (shopId,couponId) =>{
        //领取
        if(shopId == null || couponId == null){
            Toast.info("参数缺失",1);
            return;
        }
        this.props.reciveCoupon({
            shopId:shopId,
            couponId:couponId
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
            top:"45%",
            left:"10%",
        }


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
        /*couponDate = startDate.Format("yyyy-MM-dd HH:mm:ss") +"-" + endDate.Format("yyyy-MM-dd HH:mm:ss");*/
        couponDate = endDate.Format("yyyy-MM-dd HH:mm:ss");


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
        /*sharecouponDate = sharestartDate.Format("yyyy-MM-dd HH:mm:ss") +"-" + shareendDate.Format("yyyy-MM-dd HH:mm:ss");*/
        sharecouponDate = shareendDate.Format("yyyy-MM-dd HH:mm:ss");

        let hideMain = false;
        let hideShare = false;
        if(typeof coupon.couponName === "undefined"|| coupon.couponName == null){
            hideMain = true;
        }
        if(typeof shareCoupon.couponName === "undefined" || shareCoupon.couponName == null){
            hideShare = true;
        }

        return (
            <div className="draw">
                <TopBar
                    title="领取优惠券"
                    hideback="true"
                />

                <WingBlank style={{display:hideMain?"none":""}}>
                    <WhiteSpace/>
                    <Card style={{color:'#333'}} onClick={() => this.setState({showMainPart:true ,showSharePart:false})}>
                        <div style={couponStyle}>
                            <img style={couponImg} src={coupon.quickMark} alt=""/>
                            <div style={couponDiv1}>{coupon.couponName}</div>
                            <div style={couponDiv2}></div>
                            <div style={couponDiv3}>
                                <div style={{fontSize:20}}>￥{couponAmount}</div>
                                <div>有效期:{couponDate}</div>
                            </div>
                        </div>
                    </Card>
                    <div style={{display:this.state.showMainPart?"":"none"}}>
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
                                onClick={this.reciveCoupon.bind(this,coupon.shopId,coupon.id)}
                        >点击领取</Button>
                    </div>
                </WingBlank>



                <WingBlank style={{display:hideShare?"none":""}}>

                    <WhiteSpace/>
                    <span>共享优惠</span>
                    <WhiteSpace/>

                    <Card style={{color:'#333'}} onClick={() => this.setState({showMainPart:false ,showSharePart:true})}>
                        <div style={couponStyle}>
                            <img style={couponImg} src={shareCoupon.quickMark} alt=""/>
                            <div style={couponDiv1}>{shareCoupon.couponName}</div>
                            <div style={couponDiv2}></div>
                            <div style={couponDiv3}>
                                <div style={{fontSize:20}}>￥{sharecouponAmount}</div>
                                <div>有效期:{sharecouponDate}</div>
                            </div>
                        </div>
                    </Card>

                    <div style={{display:this.state.showSharePart?"":"none"}}>
                        <WhiteSpace/>
                        <Card>
                            <Card.Body>
                                <div>使用说明</div>
                                {shareCoupon.info}
                            </Card.Body>
                        </Card>
                        <WhiteSpace/>
                        <Button style={{height:40,lineHeight:"40px"}}
                                type="primary"
                                onClick={this.reciveCoupon.bind(this,shareCoupon.shopId,shareCoupon.id)}
                        >点击领取</Button>
                    </div>


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
