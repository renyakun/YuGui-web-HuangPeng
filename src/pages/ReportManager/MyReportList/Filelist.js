import { fileLabels } from '@/common/labels';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, BackTop } from 'antd';
import React, { PureComponent } from 'react';


const fileColumns = Object.keys(fileLabels).map(key => {
    if (key === 'actions') {
        return {
            title: fileLabels[key],
            render: ({ reportNo }) => (
                <a>
                    报告打印
              </a>
            ),
        };
    }
    return {
        key,
        title: fileLabels[key],
        dataIndex: key,
    };
});

class Filelist extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filelist: [{
                reportNo: 2134124,
                createRealName: 'smonua',
                createTime: '2019-10-12,10:20:34',
                checkRealName: 'smonua',
                checkTime: '2019-10-12,10:20:34',
                approveRealName: 'smonua',
                approveTime: '2019-10-12,10:20:34',
                fileRealName: 'smonua',
                fileTime: '2019-10-12,10:20:34',
            }]
        }
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="我的归档报告">
                    <Table
                        dataSource={this.state.filelist}
                        columns={fileColumns}
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

export default Filelist;