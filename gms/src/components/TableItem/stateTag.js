import React from 'react';
import { Tag } from 'antd-mobile';

/**
 * 状态格式化组件
 *
 * @param stateType 状态类型 fieldState：普通  payState： 支付状态
 * @param state 状态值
 */
export class StateTag extends React.Component{
    //设置状态数据
    getState = () => {
        let stateData = this.props.state;
        let stateType = this.props.stateType;

        if(typeof(stateType) === "undefined"){
            stateType = "fieldState";
        }

        let color = "#0DA815"; //默认颜色
        let word = "";

        switch (stateType){
            case "fieldState":
                switch (stateData){
                    case "W":{
                        color="yellow";
                        word = "初始化";
                        break;
                    }
                    case "N":{
                        word = "正常";
                        break;
                    }
                    case "L":{
                        color="red";
                        word = "锁定";
                        break;
                    }
                    case "LM":{
                        color="red";
                        word = "人工锁定";
                        break;
                    }
                    case "LA":{
                        color="red";
                        word = "自动锁定";
                        break;
                    }
                    case "C":{
                        word = "完成";
                        break;
                    }
                    case "A":{
                        word = "结束";
                        break;
                    }
                    case "D":{
                        color = "red";
                        word = "删除";
                        break;
                    }
                    case "R":{
                        word = "退款";
                        break;
                    }
                    case "O":{
                        color="red";
                        word = "过期";
                        break;
                    }
                    default: break
                }
                break;
            case "orderState":
                switch (stateData){
                    case "W":{
                        color="yellow";
                        word = "未支付";
                        break;
                    }
                    case "N":{
                        color="#108EE9";
                        word = "已支付";
                        break;
                    }
                    case "C":{
                        color="#108EE9";
                        word = "已出货";
                        break;
                    }
                    case "A":{
                        color="#108EE9";
                        word = "完成";
                        break;
                    }
                    case "LA":{
                        color="red";
                        word = "异常";
                    }
                }
                break;
            case "payState":
                break;
            default: break
        }
        return this.stateConversion(color,word);
    }

    //状态转化文字
    stateConversion(color,text){
        return (
            <span color={color}>{text}</span>
        );
    }

    render(){
        let state = this.getState();
        return(
            <span>
                {state}
            </span>
        );
    }
}
export default StateTag;