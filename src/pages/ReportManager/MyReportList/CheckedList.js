import { checkedReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';


const checkedColumns = Object.keys(checkedReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: checkedReportLabels[key],
            render: ({ reportNo }) => (
                <Link to={{ pathname: '/report/handlereport/reportcheck', report: `${reportNo}` }}>
                    提交审批
                </Link>
            ),
        };
    }
    return {
        key,
        title: checkedReportLabels[key],
        dataIndex: key,
    };
});


@connect(({  valvereport: { checkedreportlist }, loading }) => ({
    checkedreportlist,
    listLoading: loading.effects['valvereport/fetchCheckReportList'],
}))

class CheckedList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        const { checkedreportlist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的审核报告" loading={listLoading}>
                    <Table
                        dataSource={checkedreportlist}
                        columns={checkedColumns}
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

export default CheckedList;