import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import Link from 'umi/link';

@connect(({ userseting: { notifyinfo }, loading }) => ({
    notifyinfo,
    loading: loading.effects['userseting/fetchUserNotifyInfo'],
}))

class Mytask extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getNotifyUser();
    }
    getNotifyUser() {
        this.props.dispatch({
            type: 'userseting/fetchUserNotifyInfo',
        });
    }

    render() {
        const { loading, notifyinfo } = this.props;

        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="待办任务" loading={loading} >
                    <Link to={{ pathname: '/workplatform/waitcheckList' }}>
                        待审核报告:{notifyinfo['checkNum']}份
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                    <Link to={{ pathname: '/workplatform/waitapprveList' }}>
                        待审批报告:{notifyinfo['proveNum']}份
                    </Link>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default Mytask;