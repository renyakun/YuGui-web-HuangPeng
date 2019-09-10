import { microcheckedReportLabels, checkedReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop, Tag, Tooltip, Collapse } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './styles.less';

const flag = ['录入报告', '提交审核', '审核通过', '提交审批', '审批通过', '报告归档', '', '', '', '', '', '', '审核不通过', '', '审批不通过'];
const flagcolor = ['#FF7F50', '#79CDCD', '#3CB371', '#8470FF', '#218868', '#CD00CD', '', '', '', '', '', '', '#FF6347', '', '#FF0000'];

const microcheckedColumns = Object.keys(microcheckedReportLabels).map(key => {
    if (key === 'modifyFlag') {
        return {
            title: microcheckedReportLabels[key],
            width: 100,
            render: (text, record) => {
                if (text.modifyFlag == '12') {
                    return <Tooltip placement="right" title={`理由:${record.checkReason}`}>
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
            title: microcheckedReportLabels[key],
            render: (text, record) => {
                if (text.modifyFlag == '12') {
                    return <Link to={{ pathname: '/report/handle/modifyreportdetail', report: `${record.reportNo}` }}>修改报告</Link>
                } else {
                    return <Link to={{ pathname: '/report/handle/reportcheck', report: `${record.reportNo}` }}>提交审批</Link>
                }
            }
        };
    }
    return {
        key,
        title: microcheckedReportLabels[key],
        dataIndex: key,
    };
});

const expandedRowRender = record => {
    const checkedlist = [];
    checkedlist.push(record);
    const checkedColumns = Object.keys(checkedReportLabels).map(key => {
        if (key === 'reportNo') {
            return {}
        }
        return {
            key,
            title: checkedReportLabels[key],
            dataIndex: key,
        };
    });
    return <Table columns={checkedColumns} dataSource={checkedlist} pagination={false} rowKey="checkTime" />;
};

@connect(({ valvereport: { checkedreportlist }, loading }) => ({
    checkedreportlist,
    listLoading: loading.effects['valvereport/fetchCheckReportList'],
}))

class CheckedList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checkedreportlist: [],
            pageSize: 5,
            total: 10,
            current: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checkedreportlist != this.props.checkedreportlist) {
            this.setState({
                checkedreportlist: nextProps.checkedreportlist.list,
                pageSize: nextProps.checkedreportlist.pageSize,
                total: nextProps.checkedreportlist.total,
                current: nextProps.checkedreportlist.pageNum
            });
        }
    }

    componentDidMount() {
        this.fetchNewList();
    }

    fetchNewList() {
        this.props.dispatch({
            type: 'valvereport/fetchCheckReportList',
        });
    }

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };

        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchCheckReportList',
            payload: params,
        });

    };

    render() {
        const { checkedreportlist, pageSize, total, current } = this.state;
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
                <Card bordered={false} title="我的审核报告" loading={listLoading}>
                    <div className={styles.tableBody}>
                        <Table
                            dataSource={checkedreportlist}
                            columns={microcheckedColumns}
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

export default CheckedList;