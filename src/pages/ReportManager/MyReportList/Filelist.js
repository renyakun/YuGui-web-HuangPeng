import { microfileLabels, fileLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './styles.less';

const flag = ['录入报告', '提交审核', '审核通过', '提交审批', '审批通过', '报告归档', '', '', '', '', '', '', '审核不通过', '', '审批不通过'];
const flagcolor = ['#FF7F50', '#79CDCD', '#3CB371', '#8470FF', '#218868', '#CD00CD', '', '', '', '', '', '', '#FF6347', '', '#FF0000'];

const microfileColumns = Object.keys(microfileLabels).map(key => {
    if (key === 'actions') {
        return {
            title: microfileLabels[key],
            render: ({ reportNo }) => (
                <Link to={{ pathname: '/report/handle/reportview', report: `${reportNo}` }}>
                    打印报告
              </Link>
            ),
        };
    }
    return {
        key,
        title: microfileLabels[key],
        dataIndex: key,
    };
});


const expandedRowRender = record => {
    const filelist = [];
    filelist.push(record);
    const fileColumns = Object.keys(fileLabels).map(key => {
        return {
            key,
            title: fileLabels[key],
            dataIndex: key,
        };
    });

    return <Table columns={fileColumns} dataSource={filelist} pagination={false} rowKey='fileTime' />;
};


@connect(({ valvereport: { approvedfilelist }, loading }) => ({
    approvedfilelist,
    listLoading: loading.effects['valvereport/fetchApproveFilelist'],
}))

class Filelist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            approvedfilelist: [],
            pageSize: 5,
            total: 10,
            current: 1
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.approvedfilelist != this.props.approvedfilelist) {
            this.setState({
                approvedfilelist: nextProps.approvedfilelist.list,
                pageSize: nextProps.approvedfilelist.pageSize,
                total: nextProps.approvedfilelist.total,
                current: nextProps.approvedfilelist.pageNum
            });
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

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };
        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchApproveFilelist',
            payload: params,
        });

    };

    render() {
        const { approvedfilelist, pageSize, total, current } = this.state;
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
                <Card bordered={false} title="我的归档报告" loading={listLoading}>
                    <div className={styles.tableBody}>
                        <Table
                            dataSource={approvedfilelist}
                            columns={microfileColumns}
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                            loading={listLoading}
                            rowKey="reportNo"
                            expandedRowRender={expandedRowRender}
                        />
                    </div>
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default Filelist;