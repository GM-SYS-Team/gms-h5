import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router'

/**
 * 容器组件
 */
export class TopBar extends React.Component{

    //是否指定跳转页面
    leftClick = () =>{
        let targetPage = this.props.targetPage;
        if(typeof targetPage !== "undefined"){
            browserHistory.push(targetPage);
        }else{
            window.history.back();
        }

        //TODO 调用安卓滑动返回
    }

    render(){

        let title = this.props.title;
        let hideBack = this.props.hideback;


        let content = (
            <div onClick={this.leftClick}>
                <Icon type="left" />
            </div>);
        if(typeof hideBack !== "undefined" && hideBack == "true"){
            content = (<div></div>)
        }

        return(
            <div>
                <NavBar
                    className="my-navbar"
                    mode="dark"
                    leftContent={content}
                    rightContent={this.props.rightContent}
                >{title}</NavBar>
            </div>
        );
    }
}

export default TopBar;

