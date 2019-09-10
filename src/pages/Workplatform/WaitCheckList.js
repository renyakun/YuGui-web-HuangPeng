import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ReportLabels } from '@/common/labels';
import { Card, Table } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import Link from 'umi/link';



const reportColumns = Object.keys(ReportLabels).map(key => {
    if (key === 'actions') {
        return {
          title: ReportLabels[key],
          render: ({ reportNo }) => (
              <Link to={{ pathname: '/workplatform/detailwaitCheck', report: `${reportNo}` }}>
                审核报告
              </Link>
          ),
        };
    }
    return {
        key,
        title: ReportLabels[key],
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
            waitchecklist: [],
            pageSize: 5,
            total: 10,
            current:1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.waitchecklist != this.props.waitchecklist) {
            this.setState({
                waitchecklist: nextProps.waitchecklist.list,
                pageSize: nextProps.waitchecklist.pageSize,
                total: nextProps.waitchecklist.total,
                current:nextProps.waitchecklist.pageNum
            });
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

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };

        const { dispatch } = this.props;
        dispatch({
            type: 'userseting/fetchWaitCheckList',
            payload: params,
        });

    };V

    render() {
        const {waitchecklist, pageSize, total, current } = this.state;
        const {  listLoading } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            total: total,
            current: current
        };
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="待审核报告列表">
                    <Table
                        dataSource={waitchecklist}
                        columns={reportColumns}
                        pagination={paginationProps}
                        onChange={this.handleTableChange}
                        loading={listLoading}
                        rowKey="reportNo"
                    />
                </Card>
            </PageHeaderWrapper>

        )
    }
}

export default WaitCheckList;