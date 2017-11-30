import React from 'react';
import {Tooltip} from 'antd';

let showTooltip = false;
export class TextLengtFormat extends React.Component{
    getText(){
        //设置字符串默认长度
        let showTextlength = 8;
        let textDate = this.props.value;
        let textleng = this.props.textLength;
        let showTool = this.props.showTooltip;
        if(typeof textleng !=="undefined"){
            showTextlength = textleng;
        }
        if (typeof(textDate) === "undefined"){
            return textDate;
        }
        if(textDate.length > showTextlength){
            textDate = textDate.substr(0,showTextlength)+"...";
            showTooltip = true;
        }else {
            showTooltip = false;
        }
        return textDate;
    }
    render(){
        let text = this.getText();
        return(
            showTooltip?
                <Tooltip placement="topLeft" title={this.props.value}>
                    <sapn>
                        {text}
                    </sapn>
                </Tooltip>:
                <sapn>
                    {text}
                </sapn>


        );
    }

}
export default TextLengtFormat