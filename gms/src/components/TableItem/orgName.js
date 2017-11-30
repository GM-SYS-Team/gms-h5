import React from 'react';
import { Tooltip } from 'antd';

/**
 * 组织区域表格
 */

export class OrgName extends React.Component{

    render(){
        return(
            <div>
                <Tooltip placement="topLeft" title={this.props.pathName} arrowPointAtCenter>
                    <span>{this.props.orgName}</span>
                </Tooltip>
            </div>
        );
    }

}
export default OrgName;