
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Card, Form, Input, Menu, Select, Tabs, Popover, Progress } from 'antd';
import styles from './Admin.less';


const { Option } = Select;
const FormItem = Form.Item;

const passwordStatusMap = {
    ok: <div className={styles.success}>强度：强</div>,
    pass: <div className={styles.warning}>强度：中</div>,
    poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};


@Form.create()
class Security extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
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


    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('passwords');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('passwords')) {
            callback('密码不一致');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('passwords');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

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
            <Card bordered={false} title="安全设置">
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="管理员姓名:" >
                        {getFieldDecorator('real_name', {
                            rules: [
                                { required: true, message: '管理员姓名不能为空' },
                                { pattern: new RegExp('^[\u4E00-\u9FA5]{2,4}$'), message: '管理员姓名输入有误(中文)' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="账户密码:" hasFeedback >
                        <Popover
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        密码必须为6-18字母和数字组成
                                    </div>
                                </div>
                            }
                            trigger="focus"
                            overlayStyle={{ width: 240 }}
                            placement="right"
                        >
                            {getFieldDecorator('passwords', {
                                rules: [
                                    { required: true, message: '密码不能为空' },
                                    { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$'), message: '密码必须为6-18字母和数字组成' },
                                    { max: 18, message: '密码长度有误' },
                                    { validator: this.checkPassword },
                                ]
                            })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                        </Popover>
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码:" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { validator: this.checkConfirm },
                            ]
                        })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="管理员电话:" >
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '管理员电话不能为空' },
                                { pattern: new RegExp('^[1][3-8][0-9]{9}$'), message: '管理员电话输入有误' },
                                { max: 11, message: '电话长度输入有误' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="管理员邮箱:" >
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '管理员邮箱不能为空' },
                                { pattern: new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'), message: '管理员邮箱输入有误' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button size="large" type="primary" htmlType="submit" >
                            修改管理员信息
                            </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default Security;