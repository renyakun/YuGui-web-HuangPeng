import Incorporation from '@/common/Company/Incorporation';
import Addcompany from '@/common/Company/Addcompany';
import { companyLabels } from '@/common/labels';
import { Button, Card, Divider, Dropdown, Icon, Menu, Modal, Popconfirm, Table, Form, Col, Row, Input, } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';


const MenuItem = Menu.Item;
const FormItem = Form.Item;

@connect(({ company: { CompanyList }, loading }) => ({
    CompanyList,
    listLoading: loading.effects.company,
}))

@Form.create()
class Corporation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            CompanyList: [],
            pageSize: 5,
            total: 10,
            current: 1,
            selectedRowKeys: [],
            visible: false,
            AddFlag: false,
            companyContent: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.CompanyList != this.props.CompanyList) {
            this.setState({
                CompanyList: nextProps.CompanyList.list,
                pageSize: nextProps.CompanyList.pageSize,
                total: nextProps.CompanyList.total,
                current: nextProps.CompanyList.pageNum
            });
        }
    }

    componentDidMount() {
        this.fetchcompanyList();
    }

    fetchcompanyList() {
        this.props.dispatch({
            type: 'company/fetchCompanyList',
        });
    }

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };
        const { dispatch } = this.props;
        dispatch({
            type: 'company/fetchCompanyList',
            payload: params,
        });

    };

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleConfirm = e => {
        const { dispatch } = this.props;
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys) return;
        const ids = selectedRowKeys;
        dispatch({
            type: 'company/fetchdeleteCompany',
            payload: { ids },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'company/fetchCompanyList',
            });
            this.setState({
                selectedRowKeys: [],
            });
        }, 500)
    };

    handleDelete = (id) => {
        const ids = [];
        ids.push(id);
        this.props.dispatch({
            type: 'company/fetchdeleteCompany',
            payload: { ids },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'company/fetchCompanyList',
            });
        }, 500)
    }

    handleCancel = () => {
        this.setState({
            selectedRowKeys: [],
        });
    }

    handleUpdet = (record) => {
        this.setState({
            visible: true,
            companyContent: record,
        });
    }

    OnCancel = e => {
        this.setState({
            visible: false,
            AddFlag: false,
        });
    };

    getChildUpdet(flag, id, companyUse, companyAddress, companyContacts, telephone) {
        this.props.dispatch({
            type: 'company/fetchUpdateCompany',
            payload: {
                id, companyUse, companyAddress, companyContacts, telephone
            },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'company/fetchCompanyList',
            });
        }, 500)
        if (flag) {
            this.setState({
                visible: false,
            });
        }

    }

    handleAdd = () => {
        this.setState({
            AddFlag: true,
        });
    }

    getChildAdd(flag, companyUse, companyAddress, companyContacts, telephone) {
        this.props.dispatch({
            type: 'company/fetchAddCompany',
            payload: {
                companyUse, companyAddress, companyContacts, telephone
            },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'company/fetchCompanyList',
            });
        }, 500)
        if (flag) {
            this.setState({
                AddFlag: false,
            });
        }

    }


    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, values) => {
            if (!err){
                dispatch({
                    type: 'company/fetchCompanyList',
                    payload: values,
                });
            };

        }) 
    }

    handleFormReset = () => {
        this.fetchcompanyList();
      };


    renderAddcompanyForm() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="单位名称:">
                            {getFieldDecorator('companyUse')(<Input  allowClear />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="联系人:">
                            {getFieldDecorator('companyContacts')(<Input  allowClear />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span >
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        )
    }

    render() {
        const { listLoading } = this.props;
        const { CompanyList, pageSize, total, current, selectedRowKeys, visible, companyContent, AddFlag } = this.state;
        const rowSelection = { selectedRowKeys, onChange: this.onSelectChange, };
        const hasSelected = selectedRowKeys.length > 0;
        const menu = (
            <Menu>
                <MenuItem key="remove">
                    <Popconfirm
                        title="您确定要删除吗？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </MenuItem>
                <MenuItem key="approval">更多操作</MenuItem>
            </Menu>
        );
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            total: total,
            current: current
        };

        const companyColumns = Object.keys(companyLabels).map(key => {
            if (key === 'actions') {
                return {
                    title: companyLabels[key],
                    render: (text, record) => {
                        return <div>
                            <a onClick={() => this.handleUpdet(record)}>修改</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="您确定要删除吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={() => this.handleDelete(record.id)}>
                                <a>删除</a>
                            </Popconfirm>
                        </div>
                    }
                };
            }
            return {
                key,
                dataIndex: key,
                title: companyLabels[key],
            };
        });


        return (
            <Card bordered={false} title="公司管理列表">
                <div >{this.renderAddcompanyForm()}</div>
                <div style={{ marginTop: 16, position: 'relative' }}>
                    <Button type="primary" onClick={() => this.handleAdd()} style={{ marginRight: 24 }}>添加</Button>
                    {hasSelected ?
                        <span>
                            <Dropdown overlay={menu}>
                                <Button>
                                    批量操作<Icon type="down" />
                                </Button>
                            </Dropdown>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
                            </span>
                        </span>
                        : ''
                    }
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={CompanyList}
                    columns={companyColumns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    loading={listLoading}
                    rowKey="id"
                />
                <Modal
                    title="修改内容"
                    visible={visible}
                    onCancel={this.OnCancel}
                    maskClosable={false}
                    destroyOnClose
                    centered
                    footer={null}
                    width={800}
                >
                    <Incorporation companyContent={companyContent} callback={this.getChildUpdet.bind(this)} />
                </Modal>

                <Modal
                    title="添加公司"
                    visible={AddFlag}
                    onCancel={this.OnCancel}
                    maskClosable={false}
                    destroyOnClose
                    centered
                    footer={null}
                    width={800}
                >
                    <Addcompany callback={this.getChildAdd.bind(this)} />
                </Modal>
            </Card>
        )
    }
}


export default Corporation;














