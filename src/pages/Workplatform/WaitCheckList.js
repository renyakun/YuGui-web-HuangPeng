import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Row, Col, Table, Icon ,Divider, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
//import AuthController from '@/components/Bdp/AuthController';

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
            //<AuthController auth={{ id: 61 }}>
              <Link to={{ pathname: '/workplatform/waitchecklist/checkdetail', report: `${reportNo}` }}>
                审核报告
              </Link>
            //</AuthController>
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
        this.state = {
            // waitchecklist: [{
            //     key: '1',
            //     reportNo: 1234,
            //     realName: "smonua",
            //     createTime: "2019-10-12,10:20:34"
            // }]
        }
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