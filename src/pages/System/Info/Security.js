import md5 from '@/utils/md5';
import { Button, Card, Form, Input, message, Popover, Progress, Select } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './Admin.less';
import SignatureCanvas from 'react-signature-canvas';


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


@connect(({ userseting, loading }) => ({
    userseting,
    loading: loading.effects['userseting/getUpdateUser'],
}))


@Form.create()
class Security extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            trimmedDataURL: null
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        const { trimmedDataURL } = this.state;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let k in values) {
                    if (k == 'pwd') {
                        delete values[k];
                    }
                }
                values.signature = trimmedDataURL;
                if (values.signature == null) {
                    message.error("请输入电子签名")
                } else {
                    this.props.dispatch({
                        type: 'userseting/getUpdateUser',
                        payload: {
                            ...values,
                            confirmPwd: md5(values.confirmPwd),
                        },
                    });
                    setTimeout(() => {
                        message.warning("请重新登录");
                        dispatch({
                            type: 'login/logout',
                        });
                    }, 3000);
                }

            }
        })
    }

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('pwd');
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
        if (value && value !== form.getFieldValue('pwd')) {
            callback('密码不一致');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPwd'], { force: true });
        }
        callback();
    };

    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('pwd');
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

    sigPad = {}

    clear = () => {
        this.sigPad.clear()
    }

    trim = () => {
        message.success("签名成功")
        this.setState({
            trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
        })

    }

    handleclear=()=>{
        this.setState({
            trimmedDataURL: null,
        })
    }

    render() {
        const { trimmedDataURL } = this.state;
        const { submitting } = this.props;
        const { form: { getFieldDecorator, getFieldValue }, } = this.props;
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
                    <FormItem {...formItemLayout} label="账户密码:" hasFeedback >
                        <Popover
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        密码不能为空
                                    </div>
                                </div>
                            }
                            trigger="focus"
                            overlayStyle={{ width: 240 }}
                            placement="right"
                        >
                            {getFieldDecorator('pwd', {
                                rules: [
                                    { required: true, message: '密码不能为空' },
                                    //{ pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$'), message: '密码必须为6-18字母和数字组成' },
                                    //{ pattern: new RegExp('^\d{6,18}$'), message: '密码必须为6-18数字组成' },
                                    { max: 18, message: '密码长度有误' },
                                    { validator: this.checkPassword },
                                ]
                            })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                        </Popover>
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码:" hasFeedback>
                        {getFieldDecorator('confirmPwd', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { validator: this.checkConfirm },
                            ]
                        })(<Input.Password placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="电话:" >
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '管理员电话不能为空' },
                                { pattern: new RegExp('^[1][3-8][0-9]{9}$'), message: '管理员电话输入有误' },
                                { max: 11, message: '电话长度输入有误' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱:" >
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '管理员邮箱不能为空' },
                                { pattern: new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'), message: '管理员邮箱输入有误' }
                            ]
                        })(<Input placeholder='' style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="电子签名:" >
                        {trimmedDataURL == null ?
                            <div className={styles.container}>
                                <div className={styles.sigContainer}>
                                    <SignatureCanvas canvasProps={{ className: styles.sigPad }}
                                        ref={(ref) => { this.sigPad = ref }} />
                                </div>
                                <div style={{ marginTop: 10, marginLeft: 30 }}>
                                    <Button type="primary" onClick={this.clear} style={{ marginRight: 30 }}>重置</Button>
                                    <Button type="primary" onClick={this.trim}>确认</Button>
                                </div>
                            </div> : <div className={styles.container}>
                                <div className={styles.sigContainer}>
                                    <img className={styles.srcImg} src={trimmedDataURL} />
                                </div>
                                <div style={{ marginTop: 10, marginLeft: 30 }}>
                                    <Button type="primary" onClick={this.handleclear} style={{ marginRight: 30 }}>重置</Button>
                                </div>
                            </div>
                        }

                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button size="large" type="primary" htmlType="submit" loading={submitting} >
                            修改管理员信息
                            </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default Security;