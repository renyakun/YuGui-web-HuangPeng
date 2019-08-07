import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Row, Col, Table, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const newReportLabels = {
    reportNo: '报告编号',
    createName: '创建人',
    createTime: '创建时间',
    actions: '操作',
};

const reportColumns = Object.keys(newReportLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newReportLabels[key],
            render: ({ reportNo }) => (
                <a>
                    提交审核
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




class NewList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newreportlist:[{
                reportNo: 123123,
                createName: 'smonua',
                createTime: '2019-10-12,10:20:34',
            }]
        }
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的新建报告">
                <Table
                        dataSource={this.state.newreportlist}
                        columns={reportColumns}
                        pagination={false}
                        //loading={listLoading}
                        rowKey="reportNo"
                    />
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default NewList;