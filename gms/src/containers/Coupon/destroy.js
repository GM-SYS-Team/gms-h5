import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import { WingBlank,List, ActivityIndicator, WhiteSpace, Button, Modal , Toast,Result,Icon  } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import '../../utils/DateFormat'



/*销毁优惠券*/
class Destroy extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            showsucc:false,
            showfail:false,
            msg:"",
            loading:true
        }
    }

    componentDidMount(){
        //加载优惠券
        let queryParam = this.props.location.query;
        this.props.destroyCoupon({
            id:queryParam.id
        },(isSucc,msg)=>{
            this.setState({
                showsucc:isSucc,
                showfail:!isSucc,
                loading:false,
                msg:msg
            });
        });
    }

    render(){

        return (
            <div className="destroy">

                <div className="succ" style={{overflow:"hidden",display:this.state.showsucc?"":"none"}}>
                    <Result
                        type="check-circle"
                        style={{marginTop:"100px",backgroundColor:"#f5f5f9",position:"relative",top:4}}
                        img={<img src={require("./view/succ.png")} style={{width:60}} alt="" />}
                        title="操作成功"
                        message=""
                    />
                </div>

                <div className="fail" style={{overflow:"hidden",display:this.state.showfail?"":"none"}}>
                    <Result
                        style={{marginTop:"100px",backgroundColor:"#f5f5f9",position:"relative",top:4}}
                        img={<img src={require("./view/fail.png")} style={{width:60}} alt="" />}
                        title="操作失败"
                        message={this.state.msg}
                    />
                </div>

                <ActivityIndicator toast text="加载中..." animating={this.state.loading}/>

            </div>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "coupon";
export const initialState = {
};

//注入state和actions
const mapStateToProps = (state) => ({
});

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    destroyCoupon: actions.destroyCoupon
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Destroy);
