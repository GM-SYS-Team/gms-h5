import React from 'react'

export class PayType extends React.Component{
    getPayType =()=>{
        let type = this.props.payType;
        let pay="-";
        switch (type){
            case 0:{
                pay="无需支付";
                break;
            }
            case 1:{
                pay = "现金支付";
                break;
            }
            case 2:{
                pay = "银联支付";
                break;
            }
            case 3:{
                pay = "微信支付";
                break;
            }
            case 4:{
                pay = "支付宝支付";
                break;
            }
            case 5:{
                pay = "账户余额支付";
                break;
            }
        }
        return pay;
    }
    render(){
        return(
            <span style={{color:'#999999'}}>
                <span>{this.getPayType()}</span>
            </span>
        );
    }
}
export default PayType;