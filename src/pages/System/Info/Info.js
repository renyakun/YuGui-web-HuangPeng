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
            enable: 1,
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
            case 'addadmin':
                router.push(`${match.url}/addadmin`);
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
                    <span>管理员信息</span>
                ),
            },
            {
                key: 'security',
                tab: (
                    <span>安全设置</span>
                ),
            },
        ];
        const operation = [{
            key: 'addadmin',
            tab: (
                <span>添加管理员</span>
            ),
        }];

        return (
            <Card style={{ marginTop: 24 }}
                bordered={false}
                tabList={info.enable == '1' ? operationTabList.concat(operation) : operationTabList}
                activeTabKey={location.pathname.replace(`${match.path}/`, '')}
                onTabChange={this.onTabChange}
            >
                {children}
            </Card>
        )
    }
}

export default Info;
