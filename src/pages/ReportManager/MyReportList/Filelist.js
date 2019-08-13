import { fileLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';


const fileColumns = Object.keys(fileLabels).map(key => {
    if (key === 'actions') {
        return {
            title: fileLabels[key],
            render: ({ reportNo }) => (
                <Link to={{ pathname: '/reportmanager/handlereport/reportview', report: `${reportNo}` }}>
                    打印报告
              </Link>
            ),
        };
    }
    return {
        key,
        title: fileLabels[key],
        dataIndex: key,
    };
});


@connect(({ valvereport: { approvedfilelist }, loading }) => ({
    approvedfilelist,
    listLoading: loading.effects['valvereport/fetchApproveFilelist'],
}))

class Filelist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.fetchFilelist();
    }
    fetchFilelist() {
        this.props.dispatch({
            type: 'valvereport/fetchApproveFilelist',
        });
    }

    render() {
        const { approvedfilelist, listLoading } = this.props;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的归档报告" loading={listLoading}>
                    <Table
                        dataSource={approvedfilelist}
                        columns={fileColumns}
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

export default Filelist;