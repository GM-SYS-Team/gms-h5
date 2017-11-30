import React from 'react'
import { Popover,Tag } from 'antd';

export class ComplaintPopover extends React.Component{

    render(){
        const content = (
            <div style={{width:180}}>
                <p>{this.props.content}</p>
            </div>
        );
        return(
            <Popover content={content}>
                <Tag color="#F33F2B">诉</Tag>
            </Popover>
        );
    }
}
export default ComplaintPopover
