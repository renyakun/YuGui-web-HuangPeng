import { microapproveReportLabels, approveReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop, Tag, Tooltip } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './styles.less';

const flag = ['录入报告', '提交审核', '审核通过', '提交审批', '审批通过', '报告归档', '', '', '', '', '', '', '审核不通过', '', '审批不通过'];
const flagcolor = ['#FF7F50', '#79CDCD', '#3CB371', '#8470FF', '#218868', '#CD00CD', '', '', '', '', '', '', '#FF6347', '', '#FF0000'];

const microapproveColumns = Object.keys(microapproveReportLabels).map(key => {
    if (key === 'modifyFlag') {
        return {
            title: microapproveReportLabels[key],
            width: 100,
            render: (text, record) => {
                if (text.modifyFlag == '14') {
                    return <Tooltip placement="right" title={`理由:${record.approveReason}`}>
                        <Tag color={flagcolor[text.modifyFlag]}>{flag[text.modifyFlag]}</Tag>
                    </Tooltip>
                } else {
                    return <Tag color={flagcolor[text.modifyFlag]}>{flag[text.modifyFlag]}</Tag>
                }
            }
        }
    }
    if (key === 'actions') {
        return {
            title: microapproveReportLabels[key],
            render: (text, record) => {
                if (text.modifyFlag == '14') {
                    return <Link to={{ pathname: '/report/handle/modifyreportcheck', report: `${record.reportNo}` }}>修改报告</Link>
                } else {
                    return <Link to={{ pathname: '/report/handle/reportapprove', report: `${record.reportNo}` }}>报告归档</Link>
                }
            }
        };
    }
    return {
        key,
        title: microapproveReportLabels[key],
        dataIndex: key,
    };
});

const expandedRowRender = record => {
    const approvelist = [];
    approvelist.push(record);
    const approveColumns = Object.keys(approveReportLabels).map(key => {
        return {
            key,
            title: approveReportLabels[key],
            dataIndex: key,
        };
    });
    return <Table columns={approveColumns} dataSource={approvelist} pagination={false} rowKey="approveTime" />;
};

@connect(({ valvereport: { approvedreportlist }, loading }) => ({
    approvedreportlist,
    listLoading: loading.effects['valvereport/fetchApproveReportList'],
}))

class ApproveList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            approvedreportlist: [],
            pageSize: 5,
            total: 10,
            current: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.approvedreportlist != this.props.approvedreportlist) {
            this.setState({
                approvedreportlist: nextProps.approvedreportlist.list,
                pageSize: nextProps.approvedreportlist.pageSize,
                total: nextProps.approvedreportlist.total,
                current: nextProps.approvedreportlist.pageNum
            });
        }
    }

    componentDidMount() {
        this.fetchApproveList();
    }

    fetchApproveList() {
        this.props.dispatch({
            type: 'valvereport/fetchApproveReportList',
        });
    }

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };

        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchApproveReportList',
            payload: params,
        });

    };

    render() {
        const { approvedreportlist, pageSize, total, current } = this.state;
        const { listLoading } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            total: total,
            current: current
        };
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的审批报告" loading={listLoading}>
                    <div className={styles.tableBody}>
                        <Table
                            dataSource={approvedreportlist}
                            columns={microapproveColumns}
                            loading={listLoading}
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                            rowKey="reportNo"
                            expandedRowRender={expandedRowRender}
                        />
                    </div>
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default ApproveList;