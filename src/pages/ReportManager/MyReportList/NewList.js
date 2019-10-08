import { newListLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, Badge } from 'antd';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './styles.less';

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

        const reportColumns = Object.keys(newListLabels).map(key => {
            if (key === 'modifyFlag') {
                return {
                    title: newListLabels[key],
                    width: 100,
                    render: (text, record) => {
                        if (text.modifyFlag == '0') {
                            return <Badge status="processing" text="待审核" />
                        } else {
                            return <Badge status="success" text="已提交" />
                        }
                    }
                }
            }
            if (key === 'actions') {
                return {
                    title: newListLabels[key],
                    render: (text, record) => (
                        <div>
                            <Link disabled={text.modifyFlag== "0" ? false : true} to={{ pathname: '/report/handle/reportdetail', report: `${text.reportNo}` }}>
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

        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的新建报告" loading={listLoading} >
                    <div className={styles.tableList}>
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