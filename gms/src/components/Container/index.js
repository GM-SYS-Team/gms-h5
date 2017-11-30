import React from 'react';

/**
 * 容器组件
 */
export class Container extends React.Component{

    render(){
        let className = this.props.className;
        if(typeof className === "undefined"){
            className = "container"
        }else{
            className = "container "+className;
        }

        return(
            <div className={className}>{this.props.children}</div>
        );
    }
}

export default Container;

