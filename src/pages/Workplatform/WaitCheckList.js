import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { Card, Row, Col, Table, Icon ,Divider, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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
                <Link to={{pathname: '/workplatform/detailwaitCheck'}}>审核报告</Link>
            ),
        };
    }
    return {
        key,
        title: newReportLabels[key],
        dataIndex: key,
    };
});


class WaitCheckList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            waitchecklist: [{
                key: '1',
                reportNo: 1234,
                realName: "smonua",
                createTime: "2019-10-12,10:20:34"
            }]
        }
    }
    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="待审核报告列表">
                    <Table
                        dataSource={this.state.waitchecklist}
                        columns={reportColumns}
                        pagination={false}
                        rowKey="reportNo"
                    />
                </Card>
            </PageHeaderWrapper>

        )
    }
}

export default WaitCheckList;