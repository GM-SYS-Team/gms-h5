import React from 'react';


/**
 * 状态格式化组件
 *
 * @param stateType 状态类型 fieldState：普通  payState： 支付状态
 * @param state 状态值
 */
export class State extends React.Component{
    //设置状态数据
    getState = () => {
        //状态类型
        let stateType = this.props.stateType;

        //状态值
        let state = this.props.state;
        let state2 = this.props.state2;

        //默认颜色
        let color = "#0DA815";
        let word = "";

        switch (stateType){
            case "payState":{
                break;
            }
            /*商品状态*/
            case "goodsState":{
                switch (state){
                    case "N":{
                        word = "正常";
                        break;
                    }
                    case "L":{
                        color = "red";
                        word = "下架";
                        break;
                    }
                    default: break
                }
                break;
            }
            /*设备状态*/
            case "deviceState":{
                let word1 = "";
                let word2 = "";
                switch (state){
                    case "N":{
                        word1 = "正常";
                        break;
                    }
                    case "W":{
                        word1 = "初始化";
                        break;
                    }
                    case "O":{
                        color="red";
                        word1 = "过期";
                        break;
                    }
                    case "L":{
                        color="red";
                        word1 = "锁定";
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (state2){
                    case "N":{
                        word2 = "正常";
                        break;
                    }
                    case "O":{
                        word2 = "断网";
                        break;
                    }
                    case "E":{
                        word2 = "异常";
                        break;
                    }
                    default: {
                        word2 = "无";
                        break;
                    }
                }

                if((word1+word2).indexOf("正常") !== -1){
                    color = "red";
                    word = (word1+word2).replace("正常","");
                }

                if(word1 === "正常" &&　word2 === "正常"){
                    color = "green";
                    word = "正常";
                }

                if((word1+word2).indexOf("正常") === -1){
                    color = "red";
                    word = word1+"-"+word2;
                }

                break;
            }
            default: {
                switch (state){
                    case "W":{
                        color = "orange";
                        word = "初始化";
                        break;
                    }
                    case "N":{
                        word = "正常";
                        break;
                    }
                    case "L":{
                        color = "red";
                        word = "锁定";
                        break;
                    }
                    case "LM":{
                        color = "red";
                        word = "人工锁定";
                        break;
                    }
                    case "LA":{
                        color = "red";
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
                        color = "red";
                        word = "退款";
                        break;
                    }
                    case "O":{
                        color = "red";
                        word = "过期";
                        break;
                    }
                    default: break
                }
            }
        }
        return this.stateConversion(color,word);
    }

    //状态转化文字
    stateConversion(color,text){
        return (
            <div style={{display:'inline-block'}}>
                <div style={{width:5,height:5,backgroundColor:color,borderRadius:'50%',display:'inline-block',
                    lineHeight:20,margin:'0 5px 2px 0'}}>
                </div>
                <span style={{color:color}}>{text}</span>
            </div>
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
export default State;