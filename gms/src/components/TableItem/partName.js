import React from 'react';
import {Row,Tag,Col} from 'antd';
import TextFromat from './textLengthFormat';
import img from './res/img/prnImg.jpg';

/**
 *Table名称列组件
 *
 * setTag 设置标签
 * setDescribe 设置简单说明
 * imgSrc 图片地址
 * radiusSize 图片弧度
 * hide 展示还是隐藏
 * showName 显示的文字
 * textLength 显示文字的长度 默认为8
 */

export class TableName extends React.Component{
    //设置标签项
    getTags(){
        let fields = [];
        if(typeof this.props.setTag === "function"){
            fields = this.props.setTag();
        }else{
            fields = this.props.setTag;
        }
        if(typeof fields === "undefined"){
            return;
        }
        let children = [];
        for (let i = 0; i < fields.length; i++) {
            let item = fields[i];
            if(item.show){
                children.push(
                    <Tag key={i} color={item.color}>{item.showText}</Tag>
                );
            }

        }
        return children;
    }
    setDescribe=()=>{
        let describe={}
        if(typeof this.props.setDescribe === "function"){
            describe = this.props.setDescribe();
        }else{
            describe = this.props.setDescribe;
        }
        return describe;
    }
    render(){
        //图片弧度
        let radiusSize = "4px";
        if(typeof this.props.radiusSize !== "undefined"){
            radiusSize = this.props.radiusSize;
        }
        //图片地址
        let imgSrc = img;
        if(typeof this.props.imgSrc !== "undefined"){
            imgSrc = this.props.imgSrc;
        }

        //展示隐藏
        let hide = false;
        if(typeof this.props.hide !== "undefined"){
            hide = this.props.hide;
        }

        return(
            <div className={hide ? "hide":""} style={{minWidth:450}}>
                <Row>
                    <Col style={{ width:50,marginRight:10,}} span={2}>
                        <img src={imgSrc} style={{width:50,height:50,borderRadius:radiusSize,}}/>
                    </Col>
                    <Col style={{width:390,}} span={22}>
                        <Row>
                            <span style={{marginRight:10,color:'#333'}}>
                                <TextFromat value={this.props.showName} textLength={this.props.textLength}/>
                            </span>
                            {this.getTags()}
                        </Row>
                        <Row style={{marginTop:10}}>
                            {this.setDescribe()}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default TableName;