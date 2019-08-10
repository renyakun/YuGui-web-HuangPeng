import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import Link from 'umi/link';

const newReportLabels = {
    reportNo: '报告编号',
    realName: '提交人',
    createTime: '提交时间',
    actions: '操作',
};

const reportColumns = Object.keys(newReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newReportLabels[key],
            render: ({ reportNo }) => (
                <Link to={{ pathname: '/workplatform/detailwaitApprove', report: `${reportNo}` }}>
                    审批报告
              </Link>
            ),
        };
    }
    return {
        key,
        dataIndex: key,
        title: newReportLabels[key],
    };
});

@connect(({ userseting: { waitapprovelist, }, loading }) => ({
    waitapprovelist,
    listLoading: loading.effects['userseting/fetchWaitApproveList'],
}))

class WaitApprveList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.fetchWaitApproveList();
    }
    fetchWaitApproveList() {
        this.props.dispatch({
            type: 'userseting/fetchWaitApproveList',
        });
    }

    render() {
        const { waitapprovelist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="待审核报告列表" loading={listLoading}>

                    <Table
                        dataSource={waitapprovelist}
                        columns={reportColumns}
                        pagination={false}
                        loading={listLoading}
                        rowKey="reportNo"
                    />
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default WaitApprveList;