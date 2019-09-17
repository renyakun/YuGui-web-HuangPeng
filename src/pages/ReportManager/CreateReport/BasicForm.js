import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { BackTop, Button, Card, Checkbox, Form, Icon, Input, Select, AutoComplete, message, DatePicker, Row, Col, InputNumber } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';

function IndexofByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return arraytosearch[i];
        }
    }
    return null;
}

const { Option } = Select;
const { Search, TextArea } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['解体、清洗、校验', '研磨阀芯', '研磨阀座', '更换弹簧', '更换阀芯'];
const nominalOptions = ['10', '15', '20', '25', '32', '40', '50', '65', '80', '100', '125', '150', '200', '225', '275', '300', '350', '400'];
const channelOptions = ['6', '9', '10', '15', '20', '25', '32', '40', '50', '65', '80', '100', '125', '150', '200', '225', '250', '275', '300', '350'];

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1395005_5c71h7sg1e.css',
});

const companyDataList = JSON.parse(localStorage.getItem('companyDataList') || '[]');

@connect(({ valvereport, valvereport: { ReportNumber, CompanyList, autocheck }, loading }) => ({
    valvereport,
    ReportNumber,
    CompanyList,
    autocheck,
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

    componentDidMount() {
        this.getReportNumber();
        this.fetchCompanyList()
    }

    fetchCompanyList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchCompanyList',
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
        const { dispatch, form, autocheck } = this.props;
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

                let nominalDiameter = values.nominalDiameter;
                let minominal = values.minominal;
                if (minominal == undefined) {
                    values.nominalDiameter = values.nominalDiameter + "mm";
                    delete values.minominal;
                    delete values.nominalBtn;
                } else {
                    values.nominalDiameter = values.minominal + values.nominalBtn;
                    delete values.minominal;
                    delete values.nominalBtn;
                }

                let channelDiameter = values.channelDiameter;
                let michannel = values.michannel;
                if (michannel == undefined) {
                    values.channelDiameter = values.channelDiameter + "mm";
                    delete values.michannel;
                    delete values.channelBtn;
                } else {
                    values.channelDiameter = values.michannel + values.channelBtn;
                    delete values.michannel;
                    delete values.channelBtn;
                }

                let pressureLevel = values.pressureLevel;
                if (pressureLevel != undefined) {
                    values.pressureLevel = values.pressureLevel + values.psLevel + '--' + values.miLevel + values.mipsLevel
                    delete values.psLevel;
                    delete values.miLevel;
                    delete values.mipsLevel;
                }

                let checkMediumTemperature = values.checkMediumTemperature;
                let miture = values.miture;
                if (miture == undefined) {
                    checkMediumTemperature = checkMediumTemperature
                    delete values.miture;
                } else {
                    values.checkMediumTemperature = values.miture + '℃'
                    delete values.miture;
                }

                let firstSettingPressure = values.firstSettingPressure;
                if (firstSettingPressure != undefined) {
                    values.firstSettingPressure = values.firstSettingPressure + values.psfset;
                    delete values.psfset;
                }

                let firstSealTestPressure = values.firstSealTestPressure;
                if (firstSealTestPressure != undefined) {
                    values.firstSealTestPressure = values.firstSealTestPressure + values.psfsea;
                    delete values.psfsea;
                }

                let secondSettingPressure = values.secondSettingPressure;
                if (secondSettingPressure != undefined) {
                    values.secondSettingPressure = values.secondSettingPressure + values.pssdset;
                    delete values.pssdset;
                }

                let secondSealTestPressure = values.secondSealTestPressure;
                if (secondSealTestPressure != undefined) {
                    values.secondSealTestPressure = values.secondSealTestPressure + values.pssdsea;
                    delete values.pssdsea;
                }

                let thirdSettingPressure = values.thirdSettingPressure;
                if (thirdSettingPressure != undefined) {
                    values.thirdSettingPressure = values.thirdSettingPressure + values.pstdset;
                    delete values.pstdset;
                }

                let thirdSealTestPressure = values.thirdSealTestPressure;
                if (thirdSealTestPressure != undefined) {
                    values.thirdSealTestPressure = values.thirdSealTestPressure + values.pstdsea;
                    delete values.pstdsea;
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

                //console.log(values)

                if (values.checkResult != undefined) {
                    dispatch({
                        type: 'valvereport/createValveReport',
                        payload: values,
                    });
                    setTimeout(() => {
                        message.success("自动为你跳转提交审核");
                        dispatch(
                            routerRedux.push({
                                pathname: '/report/handle/reportdetail',
                                report: values.reportNo
                            })
                        )
                    }, 3000);
                }
            }
        })
    }

    handleChange = values => {
        const { dispatch } = this.props;
        const params = {
            companyUse: values,
        }
        dispatch({
            type: 'valvereport/fetchcompanyInfo',
            payload: params,
        })
    }

    handleSearch = (value) => {
        let arr = new Array();
        if (value.length > 0) {
            companyDataList.map(v => {
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
        let val = IndexofByKeyValue(companyDataList, "companyUse", value);
        this.setState({
            companyAddress: val.companyAddress,
            companyContacts: val.companyContacts,
            companyId: val.companyId,
            telephone: val.telephone,
        });
    };

    handlefilter = (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

    handleBlur = () => {
        const { dispatch, form } = this.props;
        const autovalue = {};
        autovalue.requireSettingPressure = form.getFieldValue('requireSettingPressure');
        autovalue.thirdSettingPressure = form.getFieldValue('thirdSettingPressure');
        dispatch({
            type: 'valvereport/fetchAutoCheck',
            payload: autovalue,
        });
    }

    OnChange = (value) => {
        console.log(value)
        this.setState({
            iconaf: value
        })
    }

    render() {
        const { companyDataSource, companyAddress, companyContacts, telephone, iconaf } = this.state;
        const { submitting, ReportNumber, autocheck } = this.props;
        let isQualified = '';
        let reason = '';
        if (autocheck != undefined) {isQualified = autocheck.isQualified;reason = autocheck.reason;}

        const { form: { getFieldDecorator } } = this.props;
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
        const addIcon = (iconaf == '合格' || autocheck == '合格' ? <Icon type="check" style={{ color: 'green' }} /> : <Icon type="close" style={{ color: 'red' }} />
        )

        const formItems = (
            <div>
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
                            rules: [{ required: true, message: "请输入使用单位" }]
                        })(
                            <AutoComplete
                                style={{ width: '100%' }}
                                defaultActiveFirstOption
                                dataSource={companyDataSource}
                                onSelect={this.handleSelect}
                                onSearch={this.handleSearch}
                                filterOption={this.handlefilter}
                                onChange={this.handleChange}
                                placeholder="搜索使用单位"
                            />
                        )}
                    </InputGroup>
                </FormItem>
                <FormItem {...formItemLayout} label="单位地址:" >
                    {getFieldDecorator('companyAddress', {
                        initialValue: companyAddress,
                        rules: [
                            { required: true, message: '请输入单位地址' }
                        ]
                    })(
                        <Input
                            prefix={<Icon type="environment" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            style={{ width: '100%' }}
                        //readOnly
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"联系人"}>
                    {getFieldDecorator('companyContacts', {
                        initialValue: companyContacts,
                        rules: [
                            { required: true, message: '请输入联系人姓名' },
                            // { pattern: new RegExp('^[\u4E00-\u9FA5]{2,6}$'), message: '请输入中文' }
                        ]
                    })(<Input placeholder='联系人姓名' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"联系电话"}>
                    {getFieldDecorator('telephone', {
                        initialValue: telephone,
                        rules: [
                            { required: true, message: '请输入联系电话' },
                            //{ pattern: new RegExp('^[0-9]{8,11}$'), message: '联系电话输入有误' },//^[1][3-8][0-9]{9}$^[0-9]{8,11}$
                            //{ max: 11, message: '长度输入有误' }
                        ],
                    })(<Input placeholder='联系电话' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀出厂编号"}>
                    {getFieldDecorator('deviceNo', {
                        rules: [
                            { required: true, message: '请输入安全阀出厂编号', }
                        ],
                    })(<Input placeholder='' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"设备名称"}>
                    {getFieldDecorator('deviceType', {
                        rules: [
                            { required: true, message: '请输入设备名称', }
                        ],
                    })(<Input placeholder='' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"公称通径"}>
                    <Row>
                        <Col span={6}>
                            {getFieldDecorator('nominalDiameter')(
                                <Select >
                                    {nominalOptions.map((item, i) => (
                                        <Option key={item} value={item}>{item}</Option>
                                    ))}
                                </Select>
                            )}
                        </Col>
                        <Col span={2}><Button disabled style={{ background: 'none', fontWeight: 'bolder', color: '#000' }}>mm</Button></Col>
                        <Col span={2}> </Col>
                        <Col span={2}>或</Col>
                        <Col span={6}>{getFieldDecorator('minominal', {})
                            (<InputNumber min={0} max={1000} step={0.1} style={{ width: '100%' }} />)}</Col>
                        <Col span={6}>
                            {getFieldDecorator('nominalBtn', {
                                initialValue: "mm",
                                rules: [{ required: true, message: '请输入公称通径' },]
                            })(
                                <Select>
                                    <Option value='mm'>mm</Option>
                                    <Option value='(毫米/英吋)'>(毫米/英吋)</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"流道直径"}>
                    <Row>
                        <Col span={6}>
                            {getFieldDecorator('channelDiameter')(
                                <Select>
                                    {channelOptions.map((item, i) => (
                                        <Option key={item} value={item}>{item}</Option>
                                    ))}
                                </Select>
                            )}
                        </Col>
                        <Col span={2}><Button disabled style={{ background: 'none', fontWeight: 'bolder', color: '#000' }}>mm</Button></Col>
                        <Col span={2}> </Col>
                        <Col span={2}>或</Col>
                        <Col span={6}>{getFieldDecorator('michannel', {})(
                            <InputNumber min={0} max={1000} step={0.1} style={{ width: '100%' }} />)}</Col>
                        <Col span={6}>
                            {getFieldDecorator('channelBtn', {
                                initialValue: "mm",
                                rules: [{ required: true, message: '请输入公称通径' },]
                            })(
                                <Select>
                                    <Option value='mm'>mm</Option>
                                    <Option value='(毫米/英吋)'>(毫米/英吋)</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"压力级别范围"} >
                    <Row>
                        <Col span={6}>
                            {getFieldDecorator('pressureLevel',
                                { initialValue: "0.03", rules: [{ required: true, message: '请输入压力级别范围' }] })
                                (<InputNumber min={0} max={1000} step={0.01} style={{ width: '100%' }} />)}
                        </Col>
                        <Col span={5}>
                            {getFieldDecorator('psLevel', { initialValue: "Mpa", })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}>--</Col>
                        <Col span={5}>
                            {getFieldDecorator('miLevel', { initialValue: "10", })
                                (<InputNumber min={0} max={1000} step={0.01} style={{ width: '100%' }} />
                                )}
                        </Col>
                        <Col span={5}>
                            {getFieldDecorator('mipsLevel', { initialValue: "Mpa", })(
                                <Select style={{ width: 70 }}>
                                    <Option value="Mpa">Mpa</Option>
                                    <Option value="bar">bar</Option>
                                    <Option value="psi">psi</Option>
                                </Select>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"压力表精度"}>
                    <Row>
                        <Col span={22}>
                            {getFieldDecorator('gaugeAccuracy', {
                                initialValue: '0.25',
                                rules: [{ required: true, message: '请输入压力表精度', }],
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="0.25">0.25</Option>
                                    <Option value="0.4">0.4</Option>
                                    <Option value="1.0">1.0</Option>
                                    <Option value="1.5">1.5</Option>
                                    <Option value="2.5">2.5</Option>
                                </Select>
                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={1}>级</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"检验介质温度"}>
                    <Row>
                        <Col span={3}>
                            {getFieldDecorator('checkMediumTemperature', {
                                initialValue: '常温',
                            })(<input style={{ marginLeft: 10, width: 30, border: 'none' ,background:'none'}}  disabled readOnly />)}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}>或</Col>
                        <Col span={15}>
                            {getFieldDecorator('miture', {})
                                (<InputNumber min={0} max={1000} step={0.01} style={{ width: '100%' }} />)}
                        </Col>
                        <Col span={1}></Col>
                        <Col span={1}>℃</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"外观检查"}>
                    {getFieldDecorator('checkAppearance', {
                        initialValue: '合格',
                        rules: [
                            { required: true, message: '请输入外观检查', }
                        ],
                    })(
                        <Select style={{ width: '100%' }}>
                            <Option value="合格">合格</Option>
                            <Option value="不合格">不合格</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"安装位置"}>
                    {getFieldDecorator('installLocation', {
                        rules: [
                            { required: true, message: '请输入安装位置' },
                        ],
                    })(<Input placeholder='' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀类型"}>
                    {getFieldDecorator('valveType', {
                        initialValue: '弹簧直载式',
                        rules: [
                            { required: true, message: '请输入安全阀类型', },
                        ],
                    })(
                        <Select style={{ width: '100%' }}>
                            <Option value="弹簧直载式">弹簧直载式</Option>
                            <Option value="先导式">先导式</Option>
                            <Option value="净重式">净重式</Option>
                            <Option value="杠杆式">杠杆式</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀型号"}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('valveModel', {
                                initialValue: "A4K8-16C",
                                rules: [
                                    { required: true, message: '请输入安全阀型号' }
                                ]
                            })(
                                <Select
                                    showSearch
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
                        <Col span={2}>或</Col>
                        <Col span={10}>{getFieldDecorator('mivalModel', {})(<Input placeholder="请输入安全阀型号" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"安全阀制造单位"}>
                    {getFieldDecorator('madeCompany', {
                        rules: [
                            { required: true, message: '请输入安全阀制造单位', }
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"制造许可证编号"}>
                    {getFieldDecorator('madeLicenseNo', {
                        rules: [
                            { required: true, message: '请输入制造许可证编号', }
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"出厂日期"}>
                    {getFieldDecorator('factoryTime', {
                        initialValue: moment('2015-06-06', 'YYYY-MM-DD'),
                        rules: [
                            { required: true, message: '请输入出厂日期', }
                        ],
                    })(<DatePicker defaultValue={moment('2015-06-06', 'YYYY-MM-DD')} style={{ width: '100%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"工作介质"}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('workMedium', {
                                initialValue: "水",
                                rules: [
                                    { required: true, message: '请输入工作介质' }
                                ]
                            })(
                                <Select>
                                    <Option value="空气">空气</Option>
                                    <Option value="水">水</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>

                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}>或</Col>
                        <Col span={10}>{getFieldDecorator('miwork', {})(<Input placeholder="请输入工作介质" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"执行标准"}>
                    {getFieldDecorator('standard', {
                        initialValue: "ISG ZF001-2006",
                        rules: [
                            { required: true, message: '请输入执行标准', },
                        ],
                    })(
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value='ISG ZF001-2006'>ISG ZF001-2006</Option>
                            <Option value='GRT 12243-2005'>GRT 12243-2005</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"校验方式"}>
                    {getFieldDecorator('checkMode', {
                        initialValue: "离线校验",
                        rules: [
                            { required: true, message: '请输入校验方式', },
                        ],
                    })(
                        <Select>
                            <Option value="离线校验">离线校验</Option>
                            <Option value="现场离线">现场离线</Option>
                            <Option value="在线校验">在线校验</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={"校验介质"}>
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('checkMedium', {
                                initialValue: "压缩空气",
                                rules: [
                                    { required: true, message: '请输入校验介质' }
                                ]
                            })(
                                <Select>
                                    <Option value="压缩空气">压缩空气</Option>
                                    <Option value="氮气">氮气</Option>
                                    <Option value="蒸汽">蒸汽</Option>
                                    <Option value="水">水</Option>
                                    <Option value="液压油">液压油</Option>
                                </Select>

                            )}
                        </Col>
                        <Col span={1}> </Col>
                        <Col span={2}>或</Col>
                        <Col span={10}>{getFieldDecorator('micheckMe', {})(<Input placeholder="请输入校验介质" />)}</Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={"工作压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('workPressure', {
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
                <FormItem {...formItemLayout} label={"第一次试验实际整定压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('firstSettingPressure', {
                                rules: [
                                    { required: true, message: '请输入第一次试验实际整定压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                ],
                            })(<Input placeholder='' />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('psfset', {
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
                <FormItem {...formItemLayout} label={"第一次密封测试压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('firstSealTestPressure', {
                                rules: [
                                    { required: true, message: '请输入第一次密封测试压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                ],
                            })(<Input placeholder='' />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('psfsea', {
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
                <FormItem {...formItemLayout} label={"第二次试验实际整定压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('secondSettingPressure', {
                                rules: [
                                    { required: true, message: '请输入第二次试验实际整定压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                ],
                            })(<Input placeholder='' />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pssdset', {
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
                <FormItem {...formItemLayout} label={"第二次密封测试压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('secondSealTestPressure', {
                                rules: [
                                    { required: true, message: '请输入第二次密封测试压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                ],
                            })(<Input placeholder='' />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pssdsea', {
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
                <FormItem {...formItemLayout} label={"第三次试验实际整定压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('thirdSettingPressure', {
                                rules: [
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                    { required: true, message: '第三次试验实际整定压力', },
                                ],
                            })(<Input onBlur={this.handleBlur} />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pstdset', {
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
                <FormItem {...formItemLayout} label={"第三次密封测试压力"}>
                    <Row>
                        <Col span={18}>
                            {getFieldDecorator('thirdSealTestPressure', {
                                rules: [
                                    { required: true, message: '请输入第三次密封测试压力', },
                                    { pattern: new RegExp('^[0-9]+(.[0-9]{0,10})?$'), message: '请输入数字' },
                                ],
                            })(<Input />)}
                        </Col>
                        <Col span={3}>
                            {getFieldDecorator('pstdsea', {
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
                <FormItem {...formItemLayout} label={"校验结论"}>
                    <Row>
                        {getFieldDecorator('checkResult', { initialValue: isQualified })
                            (
                                <Select>
                                    <Option value='合格'>合格</Option>
                                    <Option value='不合格'>不合格</Option>
                                </Select>
                            )}
                    </Row>
                    {autocheck != undefined ? <Row>
                        <TextArea
                            readOnly
                            value={reason}
                            autosize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Row> : null}
                </FormItem>
                <FormItem {...formItemLayout} label={"备注"}>
                    {getFieldDecorator('remarks', {
                        rules: [
                            { required: false, message: '请输入备注', },
                        ],
                    })(<Input placeholder='' />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"校验有效日期"}>
                    {getFieldDecorator('checkEffectiveTime', {
                        initialValue: moment('2015-06-06', 'YYYY-MM-DD'),
                        rules: [
                            { required: true, message: '请输入校验有效日期', }
                        ],
                    })(<DatePicker defaultValue={moment('2015-06-06', 'YYYY-MM-DD')} style={{ width: '100%' }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={"维护检修情况说明"}>
                    <Row>
                        <Col span={50}>
                            {getFieldDecorator('checkExplain', { initialValue: [], })(
                                <CheckboxGroup options={plainOptions} style={{ width: '80%' }} />
                            )}
                        </Col>
                        <Col span={3}>其它:</Col>
                        <Col span={20}>{getFieldDecorator('micheck', {})(<Input style={{ width: '80%' }} />)}</Col>
                    </Row>
                </FormItem>
            </div>
        )
        {/* addonAfter={addIcon} onChange={this.OnChange} */ }
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="报告基本信息">
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        {formItems}
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button size="large" type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.newreport" />
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop />
            </PageHeaderWrapper >
        )
    }
}

export default BasicForm;