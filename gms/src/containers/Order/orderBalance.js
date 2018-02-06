import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {WingBlank, WhiteSpace, Modal,ListView, List,InputItem,Flex,Button,Checkbox,Toast,Switch} from 'antd-mobile';
import "../../utils/DateFormat";
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';

import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

/*生成订单-结算*/
class Balance extends React.Component{

    constructor(props) {
        super(props);

        //获取商品列表
        let goodsStr = this.props.location.query.goodsIds;
        let goods = JSON.parse(goodsStr);
        let totalPrice = 0;
        goods.forEach((item,index)=>{
            if(typeof item.num === "undefined"){
                goods[index].num = 1;
            }
            totalPrice += item.num*item.sellingPrice;
        });

        this.state = {
            formError:{},
            loading:false,
            goodsList: goods,
            totalPrice:totalPrice,
        };
    }

    changeGoods(goodsId,goodsPrice,goodsNum){
        let goodsList = JSON.parse(JSON.stringify(this.state.goodsList));
        let totalPrice = 0;
        goodsList.forEach((item,index)=>{
            if(item.id == goodsId){
                if(typeof goodsPrice !== "undefined"){
                    goodsList[index].sellingPrice = goodsPrice;
                }
                if(typeof goodsNum !== "undefined"){
                    goodsList[index].num = goodsNum;
                }else{
                    goodsList[index].num = 1;
                }
            }
            totalPrice += item.num*item.sellingPrice;
        });
        this.setState({goodsList:goodsList,totalPrice:totalPrice});
    }

    delGoods(goodsId){
        let goodsList = JSON.parse(JSON.stringify(this.state.goodsList));
        let totalPrice = 0;
        goodsList.forEach((item,index)=>{
            if(item.id == goodsId){
                goodsList.splice(index,1);
            }
        });
        goodsList.forEach((item,index)=>{
            totalPrice += item.num*item.sellingPrice;
        });
        this.setState({goodsList:goodsList,totalPrice:totalPrice});
    }

    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message,1);
        }
    }


    nextStep = () =>{
        let goodsList = JSON.parse(JSON.stringify(this.state.goodsList));
        goodsList.forEach((item,index)=>{
            item.minNum = item.num;
        });

        this.props.balance({
            shopId:this.props.params.id,
            data:JSON.stringify(goodsList)
        })
    }

    render(){
        const { getFieldProps } = this.props.form;

        //商品列表
        let goods = this.state.goodsList;
        let goodsPage = [];
        goods.forEach((item,index)=>{

            goodsPage.push(
                <div>
                    <List  className="link-list">

                        <List.Item
                            extra={item.name}
                        >商品名称</List.Item>

                        <List.Item
                            extra={item.purchasingPrice}
                        >进价</List.Item>

                        <InputItem
                            value={typeof item.sellingPrice === "undefined"?1:item.sellingPrice}
                            clear
                            type="money"
                            placeholder="点击填写"
                            error={typeof this.state.formError["sellingPrice"+item.id] !== "undefined"}
                            onErrorClick={this.onErrorClick.bind(this,"sellingPrice"+item.id)}
                            onChange={(val)=>{this.changeGoods(item.id,val,item.num)}}
                        >售价</InputItem>

                        <InputItem
                            value={typeof item.num === "undefined"?1:item.num}
                            clear
                            type="money"
                            placeholder="点击填写"
                            error={typeof this.state.formError["num"+item.id] !== "undefined"}
                            onErrorClick={this.onErrorClick.bind(this,"num"+item.id)}
                            onChange={(val)=>{this.changeGoods(item.id,item.sellingPrice,val)}}
                        >数量</InputItem>

                        <Item>
                            <div style={{textAlign:"right"}}>
                                <Button
                                    type="primary"
                                    onClick={()=>this.delGoods(item.id)}
                                    inline size="small" style={{ marginRight: '4px' }}>删除</Button>
                            </div>
                        </Item>

                    </List>

                    <WhiteSpace></WhiteSpace>
                </div>
            );

        })

        return (

            <Container className="order" >

                <TopBar
                    title="结算"
                    targetPage={"/shop/detail/"+this.props.params.id}
                />

                <List className="link-list">

                    {/*<List.Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                            onClick={(checked) => { console.log(checked); }}
                        />}
                    >是否包邮</List.Item>*/}

                    <List.Item
                        extra={this.state.totalPrice}
                    >总计</List.Item>

                    <List.Item
                        extra={new Date().Format("yyyy-MM-dd HH:mm:ss")}
                    >出售时间</List.Item>

                    {/*<InputItem
                        {...getFieldProps('name', {
                            initialValue: "",
                            rules: [{ required: false,message:"请输入备注"}],
                        })}
                        placeholder="点击填写"
                        error={typeof this.state.formError["name"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"name")}
                    >备注</InputItem>*/}

                </List>

                <WhiteSpace/>

                {goodsPage}

                <div style={{position:"fixed",bottom:0,width:"100%",padding:"10px 5%",backgroundColor:"#fff"}}>
                    <Button
                        style={{height:40,lineHeight:"40px",width:"90%"}}
                        type="primary"
                        onClick={this.nextStep}>完成</Button>
                </div>

            </Container>
        );
    }
}

const BalanceWrapper = createForm()(Balance);

//组件名和组件初始化状态
export const stateKey = "order";
export const initialState = {

};

//注入state和actions
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    balance:actions.balance
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BalanceWrapper);
