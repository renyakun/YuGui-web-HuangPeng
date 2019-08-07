import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';

import {
    Form,
    Input,
    DatePicker,
    Select,
    TimePicker,
    Button,
    Cascader,
    AutoComplete,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
} from 'antd';

//面包屑
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;

const estateMap = new Map([
    ['中远两湾城', '1001|上海市,上海市,普陀区,远景路97弄'],
    ['上海康城', '1002|上海市,上海市,闵行区,莘松路958弄'],
    ['保利西子湾', '1003|上海市,上海市,松江区,广富林路1188弄'],
    ['万科城市花园', '1004|上海市,上海市,闵行区,七莘路3333弄2区-15区'],
    ['上海阳城', '1005|上海市,上海市,闵行区,罗锦路888弄']
]);

function onSelect(value) {
    console.log('onSelect', value);
}



@connect(({ loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
class AddResource extends PureComponent {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        //console.log(this.state.List);
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

    handleSearch = (value) => {
        let arr = new Array();
        if (value.length > 0) {
          estateMap.forEach((v, k) => {
            if (k.startsWith(value)) {
              arr.push(k);
            }
          });
        }
        this.setState({
          estateDataSource: arr
        });
      };
    

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            estateDataSource: [],
            estateAddress: '',
            estateId: ''
        }
    }



    render() {
        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
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
                <Card bordered={false} title="房源信息">
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        <FormItem  {...formItemLayout} label="楼盘名称:" >
                            <InputGroup compact>
                            {getFieldDecorator('NameBuilding', { rules: [{ required: true, message: "请输入楼盘名称" }] })
                                (<AutoComplete
                                    dataSource={this.state.estateDataSource}
                                    style={{ width: 200 }}
                                    onSelect={(value, option) => {
                                        let v = estateMap.get(value);
                                        this.setState({
                                          estateAddress: v.substring(v.indexOf('|') + 1),
                                          estateId: v.substring(0, v.indexOf('|'))
                                        });
                                      }}
                                      onSearch={this.handleSearch}
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                    placeholder="搜索楼盘"
                                />)}
                            </InputGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="楼盘地址:" >
                            <Input
                                prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                value={this.state.estateAddress} 
                                defaultValue={this.state.estateAddress}
                                readOnly
                            />
                        </FormItem>
                        <FormItem {...formItemLayout} label="楼栋:" >
                            <InputGroup compact>
                                {getFieldDecorator('buildingNum', { rules: [{ required: true, message: "请输入楼栋门牌号" }] })(<Input style={{ width: '30%' }} addonAfter="栋" />)}
                                {getFieldDecorator('buildingUnit', { rules: [{ required: true, message: "此项为必填项" }] })(<Input style={{ width: '30%' }} addonAfter="单元" />)}
                                {getFieldDecorator('buildingFloorNum', { rules: [{ required: true, message: "此项为必填项" }] })(<Input style={{ width: '30%' }} addonAfter="门牌号" />)}
                            </InputGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="租金">
                            <InputGroup compact>
                                {getFieldDecorator('rent', { rules: [{ required: true, pattern: new RegExp('^[0-9]*$'), message: "请输入租金(数字)" }] })(<Input style={{ width: '50%' }} max={10} addonAfter="元/月" />)}
                            </InputGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="支付方式">
                            {getFieldDecorator('paymentMethod', { initialValue: '1', rules: [{ required: true, message: "此项为必填项" }] })
                                (
                                    <Select style={{ width: '50%' }}>
                                        <Option value="1">付一押一</Option>
                                        <Option value="2">付三押一</Option>
                                        <Option value="3">付六押一</Option>
                                        <Option value="4">年付押一</Option>
                                        <Option value="5">其它</Option>
                                    </Select>
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="租赁方式">
                            {getFieldDecorator('rentMethod', { initialValue: '1', rules: [{ required: true, message: "此项为必填项" }] })
                                (
                                    <Select style={{ width: '50%' }}>
                                        <Option value="1">整租</Option>
                                        <Option value="2">合租</Option>
                                    </Select>
                                )}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.submit" />
                            </Button>
                            <Button style={{ marginLeft: 8 }}>
                                <FormattedMessage id="form.save" />
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}




export default AddResource;