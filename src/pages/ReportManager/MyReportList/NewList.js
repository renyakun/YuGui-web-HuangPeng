import { newListLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table } from 'antd';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './styles.less';

const reportColumns = Object.keys(newListLabels).map(key => {
    if (key === 'actions') {
        return {
            title: newListLabels[key],
            render: ({ reportNo }) => (
                <div>
                    <Link to={{ pathname: '/report/handle/reportdetail', report: `${reportNo}` }}>
                        提交审核
                    </Link>
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
            newreportlist: [],
            pageSize: 5,
            total: 10,
            current: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newreportlist != this.props.newreportlist) {
            this.setState({
                newreportlist: nextProps.newreportlist.list,
                pageSize: nextProps.newreportlist.pageSize,
                total: nextProps.newreportlist.total,
                current: nextProps.newreportlist.pageNum
            });
        }
    }

    componentDidMount() {
        this.fetchNewList();
    }

    fetchNewList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchNewReportList',
        });
    }

    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        };

        const { dispatch } = this.props;
        dispatch({
            type: 'valvereport/fetchNewReportList',
            payload: params,
        });

    };

    render() {
        const { newreportlist, pageSize, total, current } = this.state;
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
                <Card bordered={false} title="我的新建报告" loading={listLoading} >
                    <div className={styles.tableBody}>
                        <Table
                            dataSource={newreportlist}
                            columns={reportColumns}
                            loading={listLoading}
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
                            rowKey="reportNo"
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default NewList;