import React from 'react';
import {Row,Col,Modal} from 'antd';
import TextFromat from './textLengthFormat';
import img from './res/img/video.png';
import Video from '../../components/Video/video';

/**
 *广告信息组件
 */

export class TitleADItem extends React.Component{

    state = {
        visible: false,
    }
    //点击图片展示隐藏广告详细信息
    showInfo=()=>{
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    //是播放视频还是展示图片
    showImgOrVideo=()=>{
        let showContext=[];
        if (typeof this.props.adVO !== "undefined"){
            let adVO = this.props.adVO;
            if (adVO.adType === 1){
                showContext.push(
                   <img style={{width:490}} key={adVO.adId} src={adVO.resSrc}/>
                );
            }
            if (adVO.adType === 2){
                showContext.push(
                    <Video key={adVO.adId} src ={adVO.resSrc}/>
                );
            }
        }
        return showContext;
    }


    render(){
        let adVO = {}
        if (typeof this.props.adVO !== "undefined"){
            adVO = this.props.adVO;
        }
        //图片弧度
        let radiusSize = "4px";
        if(typeof this.props.radiusSize !== "undefined"){
            radiusSize = this.props.radiusSize;
        }
        //图片地址
        let imgSrc = img;
        if (adVO.adType === 1){
            imgSrc = adVO.thumbUrl;
        }
        //展示隐藏
        let hide = false;
        if(typeof this.props.hide !== "undefined"){
            hide = this.props.hide;
        }

        return(
            <div className={hide ? "hide":""} style={{width:270}}>
                <Row>
                    <Col style={{ width:50,marginRight:10,}} span={2}>
                        <img src={imgSrc} style={{width:50,height:50,borderRadius:radiusSize,}} onClick={this.showInfo}/>
                    </Col>
                    <Col style={{width:200}} span={22}>
                        <Row>
                            <Col>
                                <span style={{marginRight:10,color:'#333'}}>
                                    <TextFromat value={adVO.title} textLength={this.props.textLength}/>
                                </span>
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col>
                                {adVO.adZoneName}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal title="预览"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={null}
                >
                    {this.showImgOrVideo()}
                </Modal>


            </div>
        );
    }

}
export default TitleADItem;