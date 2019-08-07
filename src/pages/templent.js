import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, BackTop } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Templent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="模板">
                    Templent
                </Card>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default Templent;



