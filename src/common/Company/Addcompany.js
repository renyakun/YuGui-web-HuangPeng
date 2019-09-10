import { Button, Card, Form, Input, Select } from 'antd';
import React, { PureComponent } from 'react';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class Addcompany extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.callback(true,  values.companyUse, values.companyAddress, values.companyContacts, values.telephone);
            }
        })
    }

    render() {

        const { submitting } = this.props;
        const {
            form: { getFieldDecorator },
        } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <Card bordered={false}>
                <Form onSubmit={this.handleSubmit}
                    hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="单位名称:" >
                        {getFieldDecorator('companyUse', {
                            rules: [
                                { required: true, message: '单位名称不能为空' },
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="单位地址:" >
                        {getFieldDecorator('companyAddress', {
                            rules: [
                                { required: true, message: '位地址不能为空' },
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="联系人:" >
                        {getFieldDecorator('companyContacts', {
                            rules: [
                                { required: true, message: '联系人不能为空' },
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="联系电话:" >
                        {getFieldDecorator('telephone', {
                            rules: [
                                { required: true, message: '联系电话不能为空' },
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button size="large" type="primary" htmlType="submit" loading={submitting} >
                            添加
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default Addcompany;