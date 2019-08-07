import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { BackTop, Button, Card, Checkbox, Form, Icon, Input, Select } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

const selectAfter = (
    <Select defaultValue="Mpa" style={{ width: 80 }}>
        <Option value="Mpa">Mpa</Option>
        <Option value="bar">bar</Option>
        <Option value="psi">psi</Option>
    </Select>
);
const plainOptions = ['解体、清洗、校验', '研磨阀芯', '研磨阀座', '更换弹簧', '更换阀芯'];



@connect(({ valvereport, loading }) => ({
    valvereport,
    loading: loading.effects['valvereport/queryResource'],
}))

@Form.create()
class BasicForm extends PureComponent {

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.dispatch({
                    type: 'valvereport/queryResource',
                    payload: values,
                });
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {

        }
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
            <PageHeaderWrapper>
                <Card bordered={false} title="报告基本信息">
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="报告编号:" >
                            {getFieldDecorator('reportNo', {
                                rules: [
                                    { required: true, message: '请输入报告编号' }
                                ]
                            })(<Input placeholder='' style={{ width: '100%' }} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="使用单位:" >
                            <InputGroup compact>
                                {getFieldDecorator('companyUse', {
                                    rules: [
                                        { required: true, message: "请输入使用单位" }
                                    ]
                                })
                                    (<Input placeholder='请输入单位名称' />)}
                            </InputGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="单位地址:" >
                            {getFieldDecorator('companyAddress', {
                                rules: [
                                    { required: true, message: '请输入单位地址' }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="environment" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: '100%' }}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"联系人"}>
                            {getFieldDecorator('companyContacts', {
                                rules: [
                                    { required: true, message: '请输入联系人姓名' },
                                    { pattern: new RegExp('^[\u4E00-\u9FA5]{2,4}$'), message: '请输入(2~4)中文' }
                                ]
                            })(<Input placeholder='联系人姓名' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"联系电话"}>
                            {getFieldDecorator('telephone', {
                                rules: [
                                    { required: true, message: '请输入联系电话' },
                                    { pattern: new RegExp('^[1][3-8][0-9]{9}$'), message: '联系电话输入有误' },
                                    { max: 11, message: '长度输入有误' }
                                ],
                            })(<Input placeholder='联系电话' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"设备代码/出厂编号"}>
                            {getFieldDecorator('deviceNo', {
                                rules: [
                                    { required: true, message: '请输入设备代码/出厂编号', }
                                ],
                            })(<Input placeholder='' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"安装位置"}>
                            {getFieldDecorator('installLocation', {
                                rules: [
                                    { required: true, message: '请输入安装位置' }
                                ],
                            })(<Input placeholder='' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"安全阀类型"}>
                            {getFieldDecorator('valveType', {
                                initialValue: '1',
                                rules: [
                                    { required: true, message: '请输入安全阀类型', },
                                ],
                            })(
                                <Select style={{ width: '100%' }} onChange={handleChange}>
                                    <Option value="1">弹簧直载式</Option>
                                    <Option value="2">先导式</Option>
                                    <Option value="3">净重式</Option>
                                    <Option value="4">杠杆式</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"安全阀型号"}>
                            {getFieldDecorator('valveModel', {
                                initialValue: 'A4K8-16C',
                                rules: [
                                    { required: true, message: '请输入安全阀型号' },
                                ],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={handleChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="A4K8-16C">A4K8-16C</Option>
                                    <Option value="A5H4-13C">A5H4-13C</Option>
                                    <Option value="A8E3-16CC">A8E3-16C</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"工作压力"}>
                            {getFieldDecorator('workPressure', {
                                rules: [
                                    { required: true, message: '请输入工作压力', },
                                ],
                            })(<Input addonAfter={selectAfter} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"工作介质"}>
                            {getFieldDecorator('workMedium', {
                                initialValue: '水',
                                rules: [
                                    { required: true, message: '请输入工作介质', },
                                ],
                            })(
                                <Select style={{ width: '60%' }} onChange={handleChange}>
                                    <Option value="空气">空气</Option>
                                    <Option value="水">水</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>

                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"要求整定压力"}>
                            {getFieldDecorator('requireSettingPressure', {
                                rules: [
                                    { required: true, message: '要求整定压力', },
                                ],
                            })(<Input addonAfter={selectAfter} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"执行标准"}>
                            {getFieldDecorator('standard', {
                                rules: [
                                    { required: true, message: '请输入执行标准', },
                                ],
                            })(<Input placeholder='' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"校验方式"}>
                            {getFieldDecorator('checkMode', {
                                rules: [
                                    { required: true, message: '请输入校验方式', },
                                ],
                            })(<Input placeholder='' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"校验介质"}>
                            {getFieldDecorator('checkMedium', {
                                initialValue: '水',
                                rules: [
                                    { required: true, message: '请输入校验介质', },
                                ],
                            })(
                                <Select style={{ width: '60%' }} onChange={handleChange}>
                                    <Option value="压缩空气">压缩空气</Option>
                                    <Option value="氮气">氮气</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="水">水</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"整定压力"}>
                            {getFieldDecorator('settingPressure', {
                                rules: [
                                    { required: true, message: '请输入整定压力', },
                                ],
                            })(<Input addonAfter={selectAfter} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"密封试验压力"}>
                            {getFieldDecorator('sealTestPressure', {
                                rules: [
                                    { required: true, message: '请输入密封试验压力', },
                                ],
                            })(<Input addonAfter={selectAfter} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"校验结果"}>
                            {getFieldDecorator('checkResult', {
                                initialValue: '合格',
                                rules: [
                                    { required: true, message: '请输入校验结果', },
                                ],
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="合格">合格</Option>
                                    <Option value="不合格">不合格</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"备注"}>
                            {getFieldDecorator('remarks', {
                                rules: [
                                    { required: false, message: '请输入备注', },
                                ],
                            })(<Input placeholder='' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"维护检修情况说明"}>
                            {getFieldDecorator('checkExplain', {
                                initialValue: ['解体、清洗、校验'],
                                rules: [
                                    { required: true, message: '请输入维护检修情况说明', },
                                ],
                            })(
                                <CheckboxGroup options={plainOptions} />
                            )}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button size="large" type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.newreport" />
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default BasicForm;