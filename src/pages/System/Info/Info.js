import { Card } from 'antd';
import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
@connect(({ userseting: { info }, loading }) => ({
    info,
    loading: loading.effects['userseting/fetchUserInfo'],
}))

class Info extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userLevel: 1,
        }
    }


    componentDidMount() {
        this.getUser();
    }
    getUser() {
        this.props.dispatch({
            type: 'userseting/fetchUserInfo',
        });
    }

    onTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'admininfo':
                router.push(`${match.url}/admininfo`);
                break;
            case 'security':
                router.push(`${match.url}/security`);
                break;
            case 'usertable':
                router.push(`${match.url}/usertable`);
                break;
            default:
                break;
        }
    };



    render() {
        const {
            match,
            location,
            children,
            info,
        } = this.props;

        const operationTabList = [
            {
                key: 'admininfo',
                tab: (
                    <span>个人信息</span>
                ),
            },
            {
                key: 'security',
                tab: (
                    <span>安全设置</span>
                ),
            },
        ];
        const operation = [
            {
                key: 'usertable',
                tab: (
                    <span>用户列表</span>
                ),
            },
        ];

        return (
            <Card style={{ marginTop: 24 }}
                bordered={false}
                tabList={info.userLevel == '0' ? operationTabList.concat(operation) : operationTabList}
                activeTabKey={location.pathname.replace(`${match.path}/`, '')}
                onTabChange={this.onTabChange}
            >
                {children}
            </Card>
        )
    }
}

export default Info;
