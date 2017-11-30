import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

/**
 * 容器组件
 */
export class TopBar extends React.Component{

    leftClick = () =>{
        //TODO 调用安卓滑动返回
        window.history.back();
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

