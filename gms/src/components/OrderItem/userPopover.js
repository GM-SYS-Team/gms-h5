import React from 'react'
import { Popover } from 'antd';

/**
 * textLength 显示文字长度 默认为14
 * showTitle 所要显示的文字
 * content 卡片显示的内容，对象
 *
 */
export class UserPopover extends React.Component{


    getText(){
        //设置字符串默认长度
        let showTextlength = 14;
        let textDate = this.props.showTitle;
        let textleng = this.props.textLength;
        if(typeof textleng !=="undefined"){
            showTextlength = textleng;
        }
        if (typeof(textDate) === "undefined"){
            return textDate;
        }
        if(textDate.length > showTextlength){
            textDate = textDate.substr(0,showTextlength)+"...";
        }
        return textDate;
    }

    render(){
        let text = this.getText();
        let userContent = this.props.content;
        let user={}
        let mobile="无"
        if (typeof userContent !== "undefined"){
            user = userContent;
            if(typeof user.mobile !== "undefined"){
                mobile = user.mobile;
            }
        }
        const content = (
            <div style={{width:210}}>
                <p>电话:{mobile}</p>
            </div>
        );
        return(
            <Popover content={content} title={this.props.showTitle}>
                <span style={{color:"#333"}}>
                    {text}
                </span>
            </Popover>
        );
    }
}
export default UserPopover
