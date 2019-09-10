import { userInfoLabels } from '@/common/labels';
import DescriptionList from '@/components/DescriptionList';
import { Card } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';


const userInfoKeys = Object.keys(userInfoLabels);
const { Description } = DescriptionList;

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
                <DescriptionList>
                    {userInfoKeys.map((item, i) => (
                        <Description key={item} term={userInfoLabels[item]}>{info[item]}</Description>
                    ))}
                </DescriptionList>
            </Card>
        )
    }
}

export default AdminInfo;