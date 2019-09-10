import AddAdmin from '@/common/User/AddAdmin';
import Ellipsis from '@/components/Ellipsis';
import md5 from '@/utils/md5';
import { Button, Card, Dropdown, Icon, Menu, Modal, Popconfirm, Table } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './Admin.less';

const MenuItem = Menu.Item;

@connect(({ userseting: { userlist }, loading }) => ({
    userlist,
    loading: loading.models.userseting,
}))

class UserTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            visible: false,
            pageSize: 5,
            total: 10,
            current: 1,
            selectedRowKeys: [],
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.userlist != this.props.userlist) {
            this.setState({
                notice: nextProps.notice,
                userlist: nextProps.userlist.list,
                pageSize: nextProps.userlist.pageSize,
                total: nextProps.userlist.total,
                current: nextProps.userlist.pageNum
            });
        }
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        this.props.dispatch({
            type: 'userseting/fetchUserList',
        });
    }

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };
        const { dispatch } = this.props;
        dispatch({
            type: 'userseting/fetchUserList',
            payload: params,
        });

    };

    getChildMsg(flag, realName, userName, userPassword) {
        this.props.dispatch({
            type: 'userseting/getAddUser',
            payload: {
                realName,
                userName,
                userPassword: md5(userPassword),
            },
        });
        if (flag) {
            this.setState({
                visible: false,
            });
            setTimeout(() => {
                this.props.dispatch({
                    type: 'userseting/fetchUserList',
                });
            }, 500)
        }

    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleConfirm = e => {
        const { dispatch } = this.props;
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys) return;
        const users = selectedRowKeys;
        dispatch({
            type: 'userseting/fetchDeleteUser',
            payload: { users },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'userseting/fetchUserList',
            });
            this.setState({
                selectedRowKeys: [],
            });
        }, 500)
    }

    handleCancel = () => {
        this.setState({
            selectedRowKeys: [],
            visible: false
        });
    }

    handleDelete = (userName) => {
        const users = [];
        users.push(userName);
        this.props.dispatch({
            type: 'userseting/fetchDeleteUser',
            payload: { users },
        });
        setTimeout(() => {
            this.props.dispatch({
                type: 'userseting/fetchUserList',
            });
        }, 500)
    }

    columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            width: 150,
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            width: 150,
        },
        {
            title: '邮件地址',
            dataIndex: 'email',
            width: 300,
            render: (text, record) => <Ellipsis length={16}>{record.email}</Ellipsis>
        },
        {
            title: '职位',
            dataIndex: 'realName',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'actions',
            width: 150,
            render: (text, record) => {
                return <Popconfirm
                    title="您确定要删除吗？"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => this.handleDelete(record.userName)}
                >
                    <a>删除</a>
                </Popconfirm>
            }// 
        },
    ];

    render() {
        const { loading } = this.props;
        const { userlist, pageSize, total, current, visible, selectedRowKeys } = this.state;
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

        return (
            <Card bordered={false}>
                <Button type="primary" style={{ marginBottom: 16 }} onClick={() => this.showModal()} >添加用户</Button>
                {hasSelected ?
                    <span style={{ marginLeft: 8 }}>
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

                <div className={styles.tableBody}>
                    <Table
                        rowSelection={rowSelection}
                        dataSource={userlist}
                        columns={this.columns}
                        loading={loading}
                        pagination={paginationProps}
                        onChange={this.handleTableChange}
                        rowKey='userName'
                    />
                </div>

                <Modal
                    title="添加用户"
                    visible={visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    destroyOnClose
                    centered
                    footer={null}
                >
                    <AddAdmin title="评论列表" callback={this.getChildMsg.bind(this)} />
                </Modal>

            </Card>
        )
    }
}

export default UserTable;










