import React, { PureComponent } from 'react';

import { formatMessage, FormattedMessage } from 'umi/locale';

import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Resource extends PureComponent  {
    render() {
        return (
            <PageHeaderWrapper>
                <div>
                    Resource
                </div>
            </PageHeaderWrapper>
        )
    }
}

export default Resource;