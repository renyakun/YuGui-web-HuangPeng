import { Card, Descriptions, } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './Admin.less';


const DescriptionsItem = Descriptions.Item;

@connect(({ userseting: { info }, loading }) => ({
    info,
    loading: loading.effects['userseting/fetchUserInfo'],
}))

class AdminInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        this.props.dispatch({
            type: 'userseting/fetchUserInfo',
        });
    }

    render() {
        const { info, loading } = this.props;
        return (
            <Card bordered={false} loading={loading}>
                <Descriptions size="small" bordered={info.signatureUrl != null ? true : false} className={styles.Description}>
                    <DescriptionsItem label="用户名">{info.userName}</DescriptionsItem>
                    <DescriptionsItem label="电话">{info.phone}</DescriptionsItem>
                    <DescriptionsItem label="邮箱">{info.email}</DescriptionsItem>
                    <DescriptionsItem label="职位" span={3}>{info.realName}</DescriptionsItem>
                    {info.signatureUrl != null ? <DescriptionsItem label="电子签名">
                        <img src={info.signatureUrl} style={{ width: 200, height: 150, background: "#F2F2F2", padding: 10 }} />
                    </DescriptionsItem> : null
                    }
                </Descriptions>
            </Card>
        )
    }
}

export default AdminInfo;