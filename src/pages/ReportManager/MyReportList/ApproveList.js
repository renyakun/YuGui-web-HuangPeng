import { newReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

const reportColumns = Object.keys(newReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newReportLabels[key],
            render: ({ reportNo }) => (
                <Link to={{ pathname: '/reportmanager/handlereport/reportapprove', report: `${reportNo}` }}>
                    报告归档
              </Link>
            ),
        };
    }
    return {
        key,
        title: newReportLabels[key],
        dataIndex: key,
    };
});



@connect(({  valvereport: { approvedreportlist }, loading }) => ({
    approvedreportlist,
    listLoading: loading.effects['valvereport/fetchApproveReportList'],
}))

class ApproveList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        const { approvedreportlist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的审批报告" loading={listLoading}>
                    <Table
                        dataSource={approvedreportlist}
                        columns={reportColumns}
                        pagination={false}
                        loading={listLoading}
                        rowKey="reportNo"
                    />
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default ApproveList;