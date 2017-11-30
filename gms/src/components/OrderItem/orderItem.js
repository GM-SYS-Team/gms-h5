import React from 'react';
import { Row,Col,Tag,Form,Popconfirm,Popover} from 'antd';
import PartName from '../TableItem/partName';
import MoneyFormat from '../TableItem/moneyFormat';
import { Link } from 'react-router'
import StateTag from '../TableItem/stateTag';
import PayType from './payType';
import UserPopover from './userPopover';
import ComplaintPopover from './complaintPopover';
import ComplaintOrderModal from './complaintOrderModal';

/**
 * 订单组件
 * 属性order 订单数据
 * 方法属性complaintOrder  投诉订单 delOrderById 取消订单 starOrderById订单加星
 */
export class OrderItem extends React.Component{

    //取消订单
    delOrderById=()=>{
        if ( typeof this.props.delOrderById !== "undefined"){
            this.props.delOrderById(this.props.order.orderId);
        }
    }
    //订单加星
    starOrderById=()=>{
        if ( typeof this.props.starOrderById !== "undefined"){
            this.props.starOrderById(this.props.order.orderId);
        }
    }
    state = {
        //控制投诉订单的展示隐藏
        visible: false,
    };
    //投诉订单的展示隐藏
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    //投诉订单 表单的提交
    complaintOrder = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            Object.assign(values,{isComplaint:1});
            Object.assign(values,{orderId:this.props.order.orderId});
            if ( typeof this.props.complaintOrder !== "undefined"){
                this.props.complaintOrder(values);
            }
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    getFormatMoney = (amout)=>{
        return(
            <div>
                单价：<MoneyFormat style={{display:'inline'}} amount={amout*0.01}/>
            </div>
        );
    }

    //设置商品循环列表
    setGoodsList =()=>{
        let goodsList =this.props.order.goodsList;
        let childrenGoods =[];
        if (typeof goodsList === "undefined"){
            return;
        }else {
            for (let i=0;i<goodsList.length;i++){
                let goods =goodsList[i];
                childrenGoods.push(
                    <div style={{paddingTop:10,paddingBottom:10,border:'1px solid #F2F2F2'}} key={i}>
                        <div style={{float:'left',width:'85%',marginLeft:10}}>
                            <PartName
                                imgSrc={goods.imgSm}
                                showName={goods.name}
                                setDescribe={this.getFormatMoney.bind(this,goods.price)}/>
                        </div>
                        <div style={{height:54}}>
                            x{goods.goodsNum}
                        </div>
                    </div>
                );
            }
        }
        return childrenGoods;
    }
    //设置订单状态
    setOrderState =()=>{
        let order={}
        if ( typeof this.props.order !=="undefined"){
            order = this.props.order;
        }
        if(order.state === "LA"){
            let content=(<div style={{width:180}}><p>{order.remark}</p></div>);
            return (
                <Popover content={content} title="异常信息">
                    <Tag color="red">异常</Tag>
                </Popover>
            );
        }else {
            return(
                <StateTag stateType="orderState" state={order.state}/>
            );
        }
    }


    render(){
        let order = this.props.order;
        let isShowCancelOrder=true;
        if (order.state === "A"){
            isShowCancelOrder=false;
        }
        let isShowComplaint=false;
        if (order.isComplaint === 1){
            isShowComplaint=true;
        }
        let user = {};
        let userName="散客";
        if (typeof this.props.order.muUser !=="undefined"){
            user = this.props.order.muUser;
            userName = user.nickname
        }
        let point ={}
        if (typeof this.props.order.mdPoint !== "undefined"){
            point = this.props.order.mdPoint
        }
        let device ={}
        if(typeof this.props.order.mdDevice !== "undefined"){
            device = this.props.order.mdDevice
        }
        //订单异常备注
        let remark="无";
        if(typeof this.props.order.remark !== "undefined"){
            remark = this.props.order.remark;
        }

        return(
            <div style={{border:'1px solid #F2F2F2',marginTop:20}}>
                {/*头部*/}
                <Row style={{backgroundColor:"#F2F2F2",height:30,paddingTop:5}}>


                    <Col span={12} style={{color:'#333'}}>
                        <span style={{marginLeft:10,marginRight:10}}>订单号：{order.orderNbr}</span>
                        <span style={{marginRight:10}}>下单时间：{order.createDt}</span>
                        {/* <span style={{marginRight:10}}>现场购买</span>
                         <Tag color="#339933" style={{marginRight:10}}>券</Tag>*/}
                        <span className={isShowComplaint?"":"hide"}> <ComplaintPopover content={order.complaintRemark}/> </span>
                    </Col>


                    <Col span={12}>
                        <div style={{float:'right'}}>

                            <Link style={{marginRight:15,fontWeight:500}} to={"/order/orderDetails/"+order.orderId}>详情</Link>

                            <a style={{marginRight:15,fontWeight:500}} onClick={this.starOrderById}>{order.isStar === 1?"取消加星":"加星"}</a>

                            <Popconfirm placement="top" title="是否确认取消订单？" okText="确定" cancelText="取消" onConfirm={this.delOrderById}>
                                <span className={order.state === "LA"?"hide":""}><a className={isShowCancelOrder?"":"hide"}  style={{marginRight:15,fontWeight:500}}>取消</a></span>
                            </Popconfirm>

                            <a style={{marginRight:15,fontWeight:500}} onClick={this.showModal}>投诉</a>
                            <CollectionCreateForm
                                title={this.state.title}
                                ref={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.complaintOrder}/>
                        </div>
                    </Col>
                </Row>

                {/*中部*/}
                <Row>
                    <Col span={12}>
                        {this.setGoodsList()}
                    </Col>


                    <Col span={12}>
                        <div  style={{marginLeft:48,float:'left',width:100,marginTop:10}}>
                            <span style={{color:"#333"}}>
                                <MoneyFormat amount={order.cash*0.01}/>
                            </span>
                            <br/>
                            <PayType payType={order.payType} toolText=""/>
                        </div>

                        <div style={{float:'left',marginLeft:'8%',width:100,marginTop:15}}>
                            <UserPopover showTitle={userName} content={user}/>
                        </div>

                        <div style={{float:'left',marginLeft:'8%',width:100,marginTop:15}}>
                            {this.setOrderState()}
                        </div>
                    </Col>
                </Row>

                {/*尾部*/}
                <div style={{border:'1px solid #F2F2F2',paddingTop:5,paddingBottom:5,paddingLeft:10}}>
                    消费设备：{device.devName === undefined?"无":device.devName}

                    <span className={device.devCode === undefined?"hide":""}>({device.devCode})</span>
                </div>

            </div>
        );
    }
}

//新建商品分类表单
const CollectionCreateForm = Form.create({
    mapPropsToFields(props) {
        let returnValues = {};
        return returnValues
    },
})(ComplaintOrderModal);
export default OrderItem;
