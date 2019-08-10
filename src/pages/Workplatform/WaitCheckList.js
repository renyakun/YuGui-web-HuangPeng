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
              <Link to={{ pathname: '/workplatform/detailwaitCheck', report: `${reportNo}` }}>
                审核报告
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

@connect(({  userseting: { waitchecklist, }, loading }) => ({
    waitchecklist,
    listLoading: loading.effects['userseting/fetchWaitCheckList'],
}))

class WaitCheckList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { }
    }


    componentDidMount() {
        this.fetchWaitCheckList();
    }
    fetchWaitCheckList() {
        this.props.dispatch({
            type: 'userseting/fetchWaitCheckList',
        });
    }
    render() {
        const { waitchecklist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="待审核报告列表">
                    <Table
                        dataSource={waitchecklist}
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

export default WaitCheckList;