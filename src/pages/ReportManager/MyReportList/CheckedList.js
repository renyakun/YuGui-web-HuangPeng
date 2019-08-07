import { checkedReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';


const checkedColumns = Object.keys(checkedReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: checkedReportLabels[key],
            render: ({ reportNo }) => (
                <a>
                    提交审批
              </a>
            ),
        };
    }
    return {
        key,
        title: checkedReportLabels[key],
        dataIndex: key,
    };
});

class CheckedList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checkedreportlist: [{
                reportNo: 2134124,
                createRealName: 'smonua',
                createTime: '2019-10-12,10:20:34',
                checkRealName: 'smonua',
                checkTime: '2019-10-12,10:20:34',
            }]
        }
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的审核报告">
                    <Table
                        dataSource={this.state.checkedreportlist}
                        columns={checkedColumns}
                        pagination={false}
                        //loading={listLoading}
                        rowKey="reportNo"
                    />
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default CheckedList;