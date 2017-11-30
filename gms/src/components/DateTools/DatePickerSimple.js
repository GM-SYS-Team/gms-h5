import React from 'react';
import {Tabs, WhiteSpace, Badge, Flex, List,Button,Picker} from 'antd-mobile';


/**
 * 简单的日期选择组件
 */
export class DatePickerSimple extends React.Component{

    //日期选择内容
    pickerContent = [];

    //加载日期选择器内容，并返回默认选择内容
    loadingPickerContent(){
        //加载年份
        let date = new Date();
        let years = [];
        years.push({
            label:date.getFullYear()+"",
            value:date.getFullYear()
        });
        years.push({
            label:date.getFullYear()-1+"",
            value:date.getFullYear()-1
        });
        this.pickerContent[0] = years;
        //加载月份
        let months = [];
        months.push({
            label:"全年",
            value:0
        });
        for(var i = 1;i<date.getMonth()+2;i++){
            months.push({
                label:i+"月",
                value:i
            });
        }
        this.pickerContent[1] = months;

        return [date.getFullYear(),parseInt(date.getMonth())+1];
    }

    constructor(props){
        super(props);

        //默认选中的日期选择内容
        let selectedMonth = this.loadingPickerContent();

        this.state = {
            selectedMonth : selectedMonth,
        }
    }

    //选中函数
    onOk = (dateArr) =>{
        this.setState({"selectedMonth":dateArr});
        this.props.onOk(dateArr);
    }



    render(){

        //处理选中的值
        let selectMonthText = this.state.selectedMonth[0]+"年";
        if(this.state.selectedMonth[1] !== 0){
            selectMonthText += this.state.selectedMonth[1]+"月";
        }

        return(
            <div style={{textAlign:"center"}}>
                <Picker
                    data={this.pickerContent}
                    title="选择时间"
                    cascade={false}
                    value={this.state.selectedMonth}
                    onOk={dateArr => this.onOk(dateArr)}>
                    <Button type="primary" inline size="small" style={{ fontSize:12,height:22,lineHeight:"12px",padding:"5px 15px" }}>
                        {selectMonthText}
                    </Button>
                </Picker>
            </div>
        );
    }

}
export default DatePickerSimple;