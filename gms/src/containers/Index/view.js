import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';
import { browserHistory } from 'react-router'

import {Grid , WhiteSpace, Badge, Flex, List,Modal, ListView,Toast,Button} from 'antd-mobile';
import Container from "../../components/Container/index";

import {Link} from 'react-router';
import TopBar from "../../components/Container/TopBar";
import {getCookie, resetCookieExpireDate} from "../../utils/cookie";

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;

class Index extends React.Component{

    constructor(props) {
        super(props);
        //定义数据源
        const dataSource0 = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        //设置state
        this.state = {
            dataSource0,
            isLoading: true,
            pageData0:[],
            userType : localStorage.getItem("userType")
        };
    }

    componentDidMount(){
        if(typeof this.state.userType !== "undefined" && this.state.userType == "2"){
            let userToken = getCookie("userToken");
            if(typeof userToken !== "undefined" && userToken !== null ){
                this.props.listTuijian();
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let tabIndex = 0;
        //为数据源增加数据
        let datas = nextProps.tuijianList.couponList;
        this.setState({
            ["dataSource"+tabIndex]: this.state["dataSource"+tabIndex].cloneWithRows(datas),
            ["pageData"+tabIndex]:datas,
            isLoading: false
        });
        Toast.hide();
    }

    gridClick = (index) =>{
        let userType = localStorage.getItem("userType");

        if(index === 0){
            let userToken = getCookie("userToken");
            if(typeof userToken === "undefined" || userToken === null ){
                browserHistory.push("/login");
                return;
            }

            //1商家2个人
            if(typeof userType !== "undefined" && userType == "1"){
                browserHistory.push("/youzhuanbei");
            }else{
                alert('提示', '您不是商家用户', [
                    {
                        text: '暂不注册',
                        onPress: () =>  console.log('ok')
                    },{
                        text: '注册商家',
                        onPress: () =>  browserHistory.push("/regBus")
                    },
                ])
            }
        }
        if(index === 1){
            browserHistory.push("/index/shequ?title=社区&pic=shequ");
        }
        if(index === 2){
            browserHistory.push("/index/shequ?title=广电&pic=guangdian");
        }
        if(index === 3){
            browserHistory.push("/index/shequ?title=拓展&pic=tuozhan");
        }
        if(index === 4){
            browserHistory.push("/index/shequ?title=印章&pic=yinzhang");
        }
        if(index === 5){
            browserHistory.push("/index/shequ?title=微商&pic=weishang");
        }
    }


    render(){

        let showTuijian = false;
        let userToken = getCookie("userToken");
        if(typeof this.state.userType !== "undefined" && this.state.userType == "2" && typeof userToken !== "undefined" && userToken !== null ){
            showTuijian = true;
        }

        let data = [
            {
                icon: require('./view/icon1.png'),
                text: `优赚呗`,
            }/*,
            {
                icon: require('./view/icon2.png'),
                text: `社区`,
            },
            {
                icon: require('./view/icon3.png'),
                text: `广电`,
            },
            {
                icon: require('./view/icon4.png'),
                text: `拓展`,
            },
            {
                icon: require('./view/icon5.png'),
                text: `印章`,
            },
            {
                icon: require('./view/icon6.png'),
                text: `微商`,
            }*/
        ];

        let isShowLogin = typeof localStorage.getItem("userToken") === "undefined";

        let couponStyle = {
            position: "relative",
            color:"#000",
            textAlign:"center",
            border:"0.5px solid #f2f2f2",
            backgroundColor:"#fff",
            borderRadius: 7,
            overflow:"hidden",
            padding:"5px 0 5px 0"
        }
        let couponImg ={
            width:"auto",
            height:"80px",
        }
        let couponDiv1 = {
            top:"22%",
            left:"10%",
            fontSize:12,
            textAlign:"center"
        }


        let couponItemList = [];
        if(typeof this.props.tuijianList !== "undefined"
            && typeof this.props.tuijianList.couponList !== "undefined"
            && this.props.tuijianList.couponList.length > 0){

            this.props.tuijianList.couponList.forEach((rowData,index)=>{
                couponItemList.push(
                    <Flex.Item style={{marginLeft:0}}>
                        <div style={couponStyle}>
                            <div style={{textAlign:"center"}}>
                                <img style={couponImg} src={rowData.goodsPic} alt=""/>
                            </div>
                            <div style={couponDiv1}>{rowData.couponName}</div>
                            <Link to={"/draw?couponId="+rowData.id+"&shopId="+rowData.shopId+"&from=index"}><Button type="primary" size="small" inline>领取</Button> </Link>
                        </div>
                    </Flex.Item>);
            })
        }
        let couponContainer = (
            <Flex justify="center">{couponItemList}</Flex>
        );


        return (
            <Container className="index" >

                <TopBar
                    hideback="true"
                    title="国码扫"
                    rightContent={isShowLogin?(
                        <Link to="/login">登录</Link>
                    ):""}
                />

                <Grid
                    data={data}
                    columnNum={3}
                    hasLine={false}
                    onClick={(el,index) => this.gridClick(index)}/>


                <div style={{display:showTuijian?"":"none",position:"fixed",bottom:"70px",width:"100%"}}>
                    {couponContainer}
                </div>


            </Container>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "index";
export const initialState = {
    tuijianList: []
};
//注入state和actions
const mapStateToProps = (state) => ({
    tuijianList:state[stateKey].tuijianList
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listTuijian: actions.listTuijian
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Index);
