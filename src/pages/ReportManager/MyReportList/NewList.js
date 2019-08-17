import { newListLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table ,Divider} from 'antd';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';


const reportColumns = Object.keys(newListLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newListLabels[key],
            render: ({ reportNo }) => (
                <div>
                    <Link to={{ pathname: '/report/handlereport/reportdetail', report: `${reportNo}` }}>
                        提交审核
                    </Link>
                    {/* <Divider type="vertical" />
                    <Link to={{ pathname: `/`, search: `?reportNo=${reportNo}`, }}>
                        报告详情
                    </Link> */}
                </div>
            ),
        };
    }
    return {
        key,
        title: newListLabels[key],
        dataIndex: key,
    };
});


@connect(({ valvereport: { newreportlist }, loading }) => ({
    newreportlist,
    listLoading: loading.effects['valvereport/fetchNewReportList'],
  }))

class NewList extends PureComponent {
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
          type: 'valvereport/fetchNewReportList',
        });
      }

    render() {
        const { newreportlist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的新建报告" loading={listLoading}>
                    <Table
                        dataSource={newreportlist}
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

export default NewList;