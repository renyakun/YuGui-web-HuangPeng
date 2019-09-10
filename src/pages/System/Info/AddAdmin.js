import { Button, Card, Form, Input, Select } from 'antd';
import React, { PureComponent } from 'react';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class AddAdmin extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            realName: '',
            userName: '',
            userPassword: '',
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.callback(true,values.realName,values.userName,values.userPassword);
            }
        })
    }

    render() {

        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
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
                    <FormItem {...formItemLayout} label="用户名:" >
                        {getFieldDecorator('userName', {
                            rules: [
                                { required: true, message: '用户名不能为空' },
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户密码:" hasFeedback>
                        {getFieldDecorator('userPassword', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                            ]
                        })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"管理员职位"}>
                        {getFieldDecorator('realName', {
                            initialValue: '1',
                            rules: [
                                { required: true, message: '管理员职位不能为空' },
                            ],
                        })(
                            <Select style={{ width: '80%' }}>
                                <Option value="1">审核员</Option>
                                <Option value="2">审批员</Option>
                                <Option value="3">文员</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button size="large" type="primary" htmlType="submit" loading={submitting} >
                            创建管理员
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default AddAdmin;