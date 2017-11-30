import React from 'react';

import { Modal,Form, Input} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


/**
 * 订单投诉
 */
export class ComplaintOrderModal extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                okText="提交"
                onCancel={this.props.onCancel}
                onOk={this.props.onCreate}>
                <Form layout="vertical" >
                    <FormItem label="说明:">
                        {getFieldDecorator('complaintRemark',{
                            rules: [{ required: true, message: '请输入投诉订单的原因!' }]
                        })( <TextArea rows={4} />)}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}
export default ComplaintOrderModal;