import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { BackTop, Button, Card, Checkbox, Form, Icon, Input, Select, AutoComplete } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';

const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;


function IndexofByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return arraytosearch[i];
        }
    }
    return null;
}

const selectAfter = (
    <Select defaultValue="Mpa" style={{ width: 80 }}>
        <Option value="Mpa">Mpa</Option>
        <Option value="bar">bar</Option>
        <Option value="psi">psi</Option>
    </Select>
);
const plainOptions = ['解体、清洗、校验', '研磨阀芯', '研磨阀座', '更换弹簧', '更换阀芯'];
const companyDataList=JSON.parse(localStorage.getItem('companyDataList') || '[]');
//console.log(companyDataList);

this.setState({ companyData: companyDataList });


@connect(({ valvereport, valvereport: { ReportNumber, companyList }, loading }) => ({
    valvereport,
    ReportNumber,
    companyList,
    loading: loading.models.valvereport,
}))



@Form.create()
class BasicForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            reportNo: '',
            dataSource: [],
            companyData: [],
            companyDataSource: [],
            companyAddress: '',
            companyContacts: '',
            companyId: '',
            telephone: '',
        }
    };
    


    handleSearch = (value) => {
        let arr = new Array();
        if (value.length > 0) {
            this.state.companyData.map(v => {
                if (v.companyUse.indexOf(value) != -1) {
                    arr.push(v.companyUse);
                }
            })
            this.setState({
                companyDataSource: arr
            });
        }
    };

    handleSelect = (value) => {
        let val = IndexofByKeyValue(this.state.companyData, "companyUse", value);
        this.setState({
            companyAddress: val.companyAddress,
            companyContacts: val.companyContacts,
            companyId: val.companyId,
            telephone: val.telephone,
        });
    };

    handlefilter = (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

    handleChange = values => {
    //handleBlur = values => {
        console.log(values);
        const { dispatch } = this.props;
        const params = {
            companyUse: values,
        }
        dispatch({
            type: 'valvereport/fetchcompanyInfo',
            payload: params,
        })
    }

    componentDidMount() {
        this.getReportNumber();
        this.fetchcompanyInfo();
    }

    fetchcompanyInfo() {
        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchcompanyInfo',
        });
    }

    getReportNumber() {
        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/getReportNumber',
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("values:", values);
                this.props.dispatch({
                    type: 'valvereport/createValveReport',
                    payload: values,
                });
            }
        })
    }



    render() {

        const { submitting, ReportNumber, companyList } = this.props;
        this.setState({ companyData: companyList });
        const {
            form: { getFieldDecorator },
        } = this.props;
        const { dataSource } = this.state;
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
                                initialValue: ReportNumber,
                                rules: [
                                    { required: true, message: '请输入报告编号' }
                                ]
                            })(<Input style={{ width: '100%' }} readOnly />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="使用单位:" >
                            <InputGroup compact>
                                {getFieldDecorator('companyUse', {
                                    rules: [
                                        { required: true, message: "请输入使用单位" }
                                    ]
                                })
                                    (
                                        <AutoComplete
                                            style={{ width: '100%' }}
                                            defaultActiveFirstOption
                                            dataSource={this.state.companyDataSource}
                                            onSelect={this.handleSelect}
                                            onSearch={this.handleSearch}
                                            filterOption={this.handlefilter}
                                            onChange={this.handleChange}
                                            //onBlur={this.handleBlur}
                                            placeholder="搜索使用单位"
                                            {...this.props}
                                        />
                                    )}
                            </InputGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="单位地址:" >
                            {getFieldDecorator('companyAddress', {
                                initialValue: this.state.companyAddress,
                                rules: [
                                    { required: true, message: '请输入单位地址' }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="environment" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    style={{ width: '100%' }}
                                    readOnly
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"联系人"}>
                            {getFieldDecorator('companyContacts', {
                                initialValue: this.state.companyContacts,
                                rules: [
                                    { required: true, message: '请输入联系人姓名' },
                                    { pattern: new RegExp('^[\u4E00-\u9FA5]{2,4}$'), message: '请输入(2~4)中文' }
                                ]
                            })(<Input placeholder='联系人姓名' />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"联系电话"}>
                            {getFieldDecorator('telephone', {
                                initialValue: this.state.telephone,
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
                                <Select style={{ width: '100%' }}>
                                    <Option value="1">弹簧直载式</Option>
                                    <Option value="2">先导式</Option>
                                    <Option value="3">净重式</Option>
                                    <Option value="4">杠杆式</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"安全阀型号"}>
                            {getFieldDecorator('valveModel', {
                                initialValue: '1',
                                rules: [
                                    { required: true, message: '请输入安全阀型号' },
                                ],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="1">A4K8-16C</Option>
                                    <Option value="2">A5H4-13C</Option>
                                    <Option value="3">A8E3-16C</Option>
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
                                initialValue: '1',
                                rules: [
                                    { required: true, message: '请输入工作介质', },
                                ],
                            })(
                                <Select style={{ width: '60%' }}>
                                    <Option value="1">空气</Option>
                                    <Option value="2">水</Option>
                                    <Option value="3">蒸汽</Option>
                                    <Option value="4">液压油</Option>
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
                                initialValue: '1',
                                rules: [
                                    { required: true, message: '请输入校验介质', },
                                ],
                            })(
                                <Select style={{ width: '60%' }}>
                                    <Option value="1">压缩空气</Option>
                                    <Option value="2">氮气</Option>
                                    <Option value="3">蒸汽</Option>
                                    <Option value="4">水</Option>
                                    <Option value="5">液压油</Option>
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
                                initialValue: '1',
                                rules: [
                                    { required: true, message: '请输入校验结果', },
                                ],
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="1">合格</Option>
                                    <Option value="2">不合格</Option>
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