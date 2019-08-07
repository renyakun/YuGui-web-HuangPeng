import { newReportLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table , BackTop} from 'antd';
import React, { PureComponent } from 'react';

const reportColumns = Object.keys(newReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newReportLabels[key],
            render: ({ reportNo }) => (
                <a>
                    报告归档
              </a>
            ),
        };
    }
    return {
        key,
        title: newReportLabels[key],
        dataIndex: key,
    };
});


class ApproveList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            approvedreportlist: [{
                reportNo: 2134124,
                createRealName: 'smonua',
                createTime: '2019-10-12,10:20:34',
                checkRealName: 'smonua',
                checkTime: '2019-10-12,10:20:34',
                approveRealName: 'smonua',
                approveTime: '2019-10-12,10:20:34',
            }]
        }
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的审批报告">
                    <Table
                        dataSource={this.state.approvedreportlist}
                        columns={reportColumns}
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

export default ApproveList;