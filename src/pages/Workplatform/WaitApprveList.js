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
                <Link to={{ pathname: '/workplatform/detailwaitApprove', report: `${reportNo}` }}>
                    审批报告
              </Link>
            ),
        };
    }
    return {
        key,
        dataIndex: key,
        title: ReportLabels[key],
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
            waitapprovelist: [],
            pageSize: 5,
            total: 10,
            current: 1
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.waitapprovelist != this.props.waitapprovelist) {
            this.setState({
                waitapprovelist: nextProps.waitapprovelist.list,
                pageSize: nextProps.waitapprovelist.pageSize,
                total: nextProps.waitapprovelist.total,
                current: nextProps.waitapprovelist.pageNum
            });
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

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };

        const { dispatch } = this.props;
        dispatch({
            type: 'userseting/fetchWaitApproveList',
            payload: params,
        });

    };

    render() {
        const { waitapprovelist, pageSize, total, current } = this.state;
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
                <Card bordered={false} title="待审批报告列表" loading={listLoading}>

                    <Table
                        dataSource={waitapprovelist}
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

export default WaitApprveList;