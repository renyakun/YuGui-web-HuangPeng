import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Card, Form, Input, Menu, Select, Tabs} from 'antd'

const { Option } = Select;
const FormItem = Form.Item;


@Form.create()
class AddAdmin extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                // this.props.dispatch({
                //     type: 'valvereport/queryResource',
                //     payload: values,
                // });
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
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="用户名:" >
                        {getFieldDecorator('user_name', {
                            rules: [
                                { required: true, message: '用户名不能为空' },
                                { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,11}$'), message: '用户名必须为3-11字母和数字组成' },                  
                                { max: 11, message: '长度输入有误' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户密码:" hasFeedback >                 
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '密码不能为空' },
                                    { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$'), message: '密码必须为6-18字母和数字组成' },
                                    { max: 18, message: '密码长度有误' },
                                    { validator: this.checkPassword },
                                ]
                            })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>                
                    <FormItem {...formItemLayout} label={"管理员职位"}>
                        {getFieldDecorator('user_level', {
                            initialValue: '超级管理员',
                            rules: [
                                { required: true, message: '管理员职位不能为空', },
                            ],
                        })(
                            <Select style={{ width: '80%' }}>
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="审核员">审核员</Option>
                                <Option value="审批员">审批员</Option>
                                <Option value="文员">文员</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button size="large" type="primary" htmlType="submit" >
                            创建管理员
                            </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default AddAdmin;