import React, { Component } from 'react';
import E from 'wangeditor'
import './richText.less';
import {API_URL} from '../../config';

/**
 * 使用wangeditor
 */
class RichText extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            init:false,
            editorContent: ''
        }
    }
    editor = null;
    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new E(elem);

        this.editor.customConfig.uploadImgServer = API_URL+"/upload/img";
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig.onchange = html => {
            this.setState({editorContent: html});
            //回调
            this.props.handleChange(html);
        }
        this.editor.create()
        this.editor.txt.html(this.props.initValue)
    }

    componentDidUpdate(){
        if(!this.state.init && typeof this.props.initValue !== "undefined"){
            this.editor.txt.html(this.props.initValue);
            this.setState({init: true})
        }
    }

    render() {
        return (
            <div ref="editorElem" style={{textAlign: 'left'}}> </div>
        );
    }
}

export default RichText;
