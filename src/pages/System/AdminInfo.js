import React, { PureComponent } from 'react';
import { userInfoLabels } from '@/common/labels';
import { info } from '@/common/data';
import DescriptionList from '@/components/DescriptionList';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, BackTop } from 'antd';


const userInfoKeys = Object.keys(userInfoLabels);
const { Description } = DescriptionList;

class AdminInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Card bordered={false} title="基本信息">
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