import React from 'react';
import { Upload, Icon, message,Modal  } from 'antd';
import {API_URL} from '../../config';

/**
 * 上传图片-图片墙的风格
 * 参数
 * maxNum:最多上传数量
 * fileLists:文件列表
 * onUpload:上传回调
 */
export class UploadImg extends React.Component{

    /**
     * 文件列表格式
     * fileList:{
       uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
       name: 'xx.png'   // 文件名
       status: 'done',  // 状态有：uploading done error removed
       response: '{"status": "success"}',  // 服务端响应内容
        }
     */
    //上传参数
    state = {
        init:false,
        previewVisible: false,
        previewImage: '',
        fileList: []
    };

    componentDidUpdate(){

        if(!this.state.init
            && typeof this.props.fileLists !== "undefined"
            && this.props.fileLists.length > 0){

            //把数据库格式转换为组件格式
            let fileLists = [];
            let showfileLists = [];
            if(typeof this.props.fileLists === "object"){
                showfileLists = this.props.fileLists;
            }
            if(typeof this.props.fileLists === "string"){
                if(this.props.fileLists.indexOf("[") !== -1){
                    showfileLists = JSON.parse(this.props.fileLists)
                }else{
                    showfileLists.push(this.props.fileLists);
                }
            }

            for(var i = 0;i<showfileLists.length;i++){
                var obj = {
                    uid:-Math.floor(Math.random()*100000),
                    name:showfileLists[i],
                    url:showfileLists[i],
                    status:'done',
                    response:{data:showfileLists[i]}
                }
                fileLists.push(obj);
            }
            this.setState({fileList:fileLists,init:true});
        }
    }

    //取消
    handleCancel = () => {
        this.setState({previewVisible:false});
    }

    //预览
    handlePreview = (file) => {
        this.setState({previewImage:file.url || file.thumbUrl,previewVisible:true});
    }

    //上传之前
    beforeUpload = (file) =>{
        //最大上传数量
        let maxNum = this.props.maxNum;
        if(typeof maxNum === 'number'
            && maxNum%1 === 0
            && maxNum === this.state.fileList.length){
            message.error('最多上传'+maxNum+'张图片');
            return false;
        }
        return true;
    }

    //文件列表修改
    handleChange = ({ fileList }) => {
        console.log(fileList);
        this.setState({fileList:fileList});
        let conventFile = [];
        for(var i = 0;i<this.state.fileList.length;i++){
            if(typeof this.state.fileList[i].response !== "undefined"){
                let thisFile = this.state.fileList[i].response.url;
                conventFile.push(thisFile)
            }
        }
        this.props.onUpload(conventFile);
    }

    render() {
        //展示的图片列表
        var pushList = this.state.fileList;

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={API_URL+"/upload/img"}
                    listType="picture-card"
                    fileList={pushList}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}>
                    {fileList.length >= this.props.maxNum ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

}
export default UploadImg;