import React from 'react';

/**
 * 根据出生日期计算年龄
 */
export class AgeByBirthday extends React.Component{

    //根据出生日期计算出年龄
    getAgeByBirthday = (birthday)=>{
        var sDate=birthday.replace(/(^\s+|\s+$)/g,''); //去两边空格;
        //验证是否是时间
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = sDate.match(reg);
        if(r === null)
            throw new Error("请输入正确的日期格式！如:1998-09-06 10:58:56");
        var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
        return new Date().getFullYear()-d.getFullYear();
    }
    render(){
        let birthdayResult = this.props.birthday;
        if (typeof birthdayResult !== "undefined"){
            var Age = this.getAgeByBirthday(birthdayResult)+"岁";
        }else {
            Age = "-"
        }
        return(
            <div style={this.props.style}>
                {Age}
            </div>
        );
    }
}
export default AgeByBirthday;