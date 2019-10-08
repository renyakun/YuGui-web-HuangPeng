import { Button, Checkbox, Drawer, Form, Icon, Input, Select, DatePicker, Row, Col } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import moment from 'moment';

const { Option } = Select;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

@connect(({ valvereport }) => ({ valvereport }))

@Form.create()
class ModifyReport extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let checkExplain = values.checkExplain;
                let micheck = values.micheck;
                if (micheck == undefined) {
                    checkExplain = checkExplain
                    delete values.micheck;
                } else if (micheck != '') {
                    checkExplain.splice(0, 0, micheck);
                    delete values.micheck;
                }

                let valveModel = values.valveModel;
                let mivalModel = values.mivalModel;
                if (mivalModel == undefined) {
                    valveModel = valveModel
                    delete values.mivalModel;
                } else {
                    values.valveModel = values.mivalModel
                    delete values.mivalModel;
                }

                let workMedium = values.workMedium;
                let miwork = values.miwork;
                if (miwork == undefined) {
                    workMedium = workMedium
                    delete values.miwork;
                } else {
                    values.workMedium = values.miwork
                    delete values.miwork;
                }

                let checkMedium = values.checkMedium;
                let micheckMe = values.micheckMe;
                if (micheckMe == undefined) {
                    checkMedium = checkMedium
                    delete values.micheckMe;
                } else {
                    values.checkMedium = values.micheckMe
                    delete values.micheckMe;
                }

                let workPressure = values.workPressure;
                if (workPressure != undefined) {
                    values.workPressure = values.workPressure + values.pswork;
                    delete values.pswork;
                }

                let requireSettingPressure = values.requireSettingPressure;
                if (requireSettingPressure != undefined) {
                    values.requireSettingPressure = values.requireSettingPressure + values.psreqset;
                    delete values.psreqset;
                }

                let settingPressure = values.settingPressure;
                if (settingPressure != undefined) {
                    values.settingPressure = values.settingPressure + values.pssetg;
                    delete values.pssetg;
                }

                let sealTestPressure = values.sealTestPressure;
                if (sealTestPressure != undefined) {
                    values.sealTestPressure = values.sealTestPressure + values.pssealt;
                    delete values.pssealt;
                }

                dispatch({
                    type: 'valvereport/updateReport',
                    payload: values,
                });

                this.props.callback(true, values.reportNo);
            }
        });
    };

    render() {
        const { visible, form, title, onCancel, reportInformation } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        const plainOptions = ['外观检查、清理、校验','解体、清洗、校验', '研磨阀芯', '研磨阀座', '更换弹簧', '更换阀芯'];

        let workPressure = '';
        let requireSettingPressure= '';
        let sealTestPressure= '';
        let settingPressure= '';
        if (reportInformation.workPressure != undefined) {
            workPressure = reportInformation.workPressure.slice(0, (workPressure.length - 3));
            requireSettingPressure = reportInformation.requireSettingPressure.slice(0, (requireSettingPressure.length - 3));
            sealTestPressure = reportInformation.sealTestPressure.slice(0, (sealTestPressure.length - 3));
            settingPressure = reportInformation.settingPressure.slice(0, (settingPressure.length - 3));
        }

        const formItems = (
            <div>
                <FormItem {...formItemLayout} label="报告编号:" >
                    {getFieldDecorator('reportNo', {
                        initialValue: reportInformation.reportNo,
                        rules: [
                            { required: true, message: '请输入报告编号' }
                        ]
                    })(<Input style={{ width: '80%' }} readOnly />)}
                </FormItem>
                <FormItem {...formItemLayout} label="使用单位:" >
                    <InputGroup compact>
                        {getFieldDecorator('companyUse', {
                            initialValue: reportInformation.companyUse,
                            rules: [{ required: true, message: "请输入使用单位" }]
                        })(<Input style={{ width: '80%' }} />)}
                    </InputGroup>
                </FormItem>
                <FormItem {...formItemLayout} label="单位地址:" >
                    {getFieldDecorator('companyAddress', {
                        initialValue: reportInformation.companyAddress,
                        rules: [{ required: true, message: '请输入单位地址' }]
                    })(
                        <Input
                            prefix={<Icon type="environment" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            style={{ width: '80%' }}
                        //readOnly
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"联系人"}>
                    {getFieldDecorator('companyContacts', {
                        initialValue: reportInformation.companyContacts,
                        rules: [
                            { required: true, message: '请输入联系人姓名' },
                            // { pattern: new RegExp('^[\u4E00-\u9FA5]{2,6}$'), message: '请输入中文' }
                        ]
                    })(<Input placeholder='联系人姓名' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"联系电话"}>
                    {getFieldDecorator('telephone', {
                        initialValue: reportInformation.telephone,
                        rules: [
                            { required: true, message: '请输入联系电话' },
                            //{ pattern: new RegExp('^[0-9]{8,11}$'), message: '联系电话输入有误' },//^[1][3-8][0-9]{9}$^[0-9]{8,11}$
                            //{ max: 11, message: '长度输入有误' }
                        ],
                    })(<Input placeholder='联系电话' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀出厂编号"}>
                    {getFieldDecorator('deviceNo', {
                        initialValue: reportInformation.deviceNo,
                        rules: [
                            { required: true, message: '请输入安全阀出厂编号', }
                        ],
                    })(<Input placeholder='' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"安装位置"}>
                    {getFieldDecorator('installLocation', {
                        initialValue: reportInformation.installLocation,
                        rules: [
                            { required: true, message: '请输入安装位置' }
                        ],
                    })(<Input placeholder='' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀类型"}>
                    {getFieldDecorator('valveType', {
                        initialValue: reportInformation.valveType,
                        rules: [
                            { required: true, message: '请输入安全阀类型', },
                        ],
                    })(
                        <Select style={{ width: '80%' }}>
                            <Option value="弹簧直载式">弹簧直载式</Option>
                            <Option value="先导式">先导式</Option>
                            <Option value="净重式">净重式</Option>
                            <Option value="杠杆式">杠杆式</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀型号"}>
                    <Row>
                        <Col span={9}>
                            {getFieldDecorator('valveModel', {
                                initialValue: reportInformation.valveModel,
                                rules: [
                                    { required: true, message: '请输入安全阀型号' }
                                ]
                            })(
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="A4K8-16C">A4K8-16C</Option>
                                    <Option value="A5H4-13C">A5H4-13C</Option>
                                    <Option value="A8E3-16C">A8E3-16C</Option>
                                </Select>
                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}> 其它: </Col>
                        <Col span={7}>{getFieldDecorator('mivalModel', {})(<Input placeholder="请输入安全阀型号" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"工作介质"}>
                    <Row>
                        <Col span={9}>
                            {getFieldDecorator('workMedium', {
                                initialValue: reportInformation.workMedium,
                                rules: [
                                    { required: true, message: '请输入工作介质' }
                                ]
                            })(
                                <Select allowClear>
                                    <Option value="空气">空气</Option>
                                    <Option value="水">水</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>

                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}> 其它: </Col>
                        <Col span={7}>{getFieldDecorator('miwork', {})(<Input placeholder="请输入工作介质" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"执行标准"}>
                    {getFieldDecorator('standard', {
                        initialValue: reportInformation.standard,
                        rules: [
                            { required: true, message: '请输入执行标准', },
                        ],
                    })(<Input placeholder='' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"校验方式"}>
                    {getFieldDecorator('checkMode', {
                        initialValue: reportInformation.checkMode,
                        rules: [
                            { required: true, message: '请输入校验方式', },
                        ],
                    })(<Input placeholder='' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"校验介质"}>
                    <Row>
                        <Col span={9}>
                            {getFieldDecorator('checkMedium', {
                                initialValue: reportInformation.checkMedium,
                                rules: [
                                    { required: true, message: '请输入校验介质' }
                                ]
                            })(
                                <Select allowClear>
                                    <Option value="压缩空气">压缩空气</Option>
                                    <Option value="氮气">氮气</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="水">水</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>

                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}> 其它: </Col>
                        <Col span={7}>{getFieldDecorator('micheckMe', {})(<Input placeholder="请输入校验介质" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"工作压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('workPressure', {
                                initialValue: workPressure,
                                rules: [
                                    { required: true, message: '请输入工作压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,5})?$'), message: '请输入数字' },
                                ],
                            })(<Input />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pswork', {
                                initialValue: "Mpa",
                            })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"要求整定压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('requireSettingPressure', {
                                initialValue: requireSettingPressure,
                                rules: [
                                    { required: true, message: '要求整定压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,5})?$'), message: '请输入数字' },
                                ],
                            })(<Input />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('psreqset', {
                                initialValue: "Mpa",
                            })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"整定压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('settingPressure', {
                                initialValue: settingPressure,
                                rules: [
                                    { required: true, message: '请输入整定压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,5})?$'), message: '请输入数字' },
                                ],
                            })(<Input />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pssetg', {
                                initialValue: "Mpa",
                            })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"密封试验压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('sealTestPressure', {
                                initialValue: sealTestPressure,
                                rules: [
                                    { required: true, message: '请输入密封试验压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,5})?$'), message: '请输入数字' },
                                ],
                            })(<Input />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pssealt', {
                                initialValue: "Mpa",
                            })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"校验结果"}>
                    {getFieldDecorator('checkResult', {
                        initialValue: reportInformation.checkResult,
                        rules: [
                            { required: true, message: '请输入校验结果', },
                        ],
                    })(
                        <Select style={{ width: '80%' }}>
                            <Option value="合格">合格</Option>
                            <Option value="不合格">不合格</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"备注"}>
                    {getFieldDecorator('remarks', {
                        initialValue: reportInformation.remarks,
                        rules: [
                            { required: false, message: '请输入备注', },
                        ],
                    })(<Input placeholder='' style={{ width: '80%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"维护检修情况说明"}>
                    <Row>
                        <Col span={50}>
                            {getFieldDecorator('checkExplain', { initialValue: [], })(
                                <CheckboxGroup options={plainOptions} style={{ width: '80%' }} />
                            )}
                        </Col>
                        <Col span={2}>其它:</Col>
                        <Col span={20}>{getFieldDecorator('micheck', {})(<Input style={{ width: '80%' }} />)}</Col>
                    </Row>
                </FormItem>
            </div>
        )

        return (
            <Drawer
                title={title}
                placement="right"
                width={885}
                visible={visible}
                onClose={onCancel}
            >
                <Form onSubmit={this.handleSubmit} style={{ boxSizing: 'border-box' }}>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">提交报告</Button>
                    </FormItem>
                </Form>
            </Drawer>
        );
    }
};
export default ModifyReport;