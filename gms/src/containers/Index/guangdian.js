import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/style.less';

import {Grid , WhiteSpace, Badge, Flex, List} from 'antd-mobile';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";

import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class Guangdian extends React.Component{


    componentDidMount(){

    }


    render(){

        return (
            <Container className="index"  >

                <TopBar
                    title="广电"
                    targetPage="/"
                />

                <p style={{fontSize:15,color:"#404040",textAlign:"left",marginTop:0,padding:15,lineHeight:"1.5em"}}>
                    <p>
                        为规范电视播出时所使用二维码的码制要求，推动二维码在广播电视领域的应用，总局科技司于2015年立项“二维码技术在广播电视领域的应用研究”项目，并于2016年立项“电视播出二维码技术要求”标准项目，目前两个项目均已完成并通过验收，行业标准“电视播出二维码技术要求”已经发布，标准号GY/T 305 -2017。
                    </p>
                    <p>2017年，总局科技司批复了“国家电视二维码标准应用推广中心”的建设任务，目标是推动GY/T 305-2017“电视播出二维码技术要求”的应用发展。</p>
                    <p>
                    二维码标准及技术的应用能够促进电视与观众互动能力，推进广电移动客户端的应用，扩大广电传播渠道的覆盖面，对推动媒体融合发展具有积极作用。可运用二维码互动功能，推进广电系统APP客户端安装量和活跃度；可运用二维码的引导信息的功能导入更多家庭服务需求，激活广电APP的使用及频率提升；可使用二维码的互动特性，将广大群众的积极建议和批评意见及时采集，构建新环境下经常联系群众的新渠道。
                    </p>
                    </p>

            </Container>
        );
    }
}

//组件名和组件初始化状态
export const stateKey = "index";
export const initialState = {
};

//注入state和actions
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Guangdian);
