import { reportListLabels } from '@/common/labels';
import DescriptionList from '@/components/DescriptionList';
import React, { PureComponent } from 'react';

const { Description } = DescriptionList;
const reportListKeys = Object.keys(reportListLabels);

class Particulars extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { reportInfo } = this.props;
        return (
            <DescriptionList style={{ marginBottom: 24 }} >
                {reportListKeys.map((item, i) => (
                    <Description key={item} term={reportListLabels[item]} >
                        {reportListLabels[item] == "维护检修情况说明" ? reportInfo[item] + '' : reportInfo[item]}
                    </Description>
                ))}
            </DescriptionList>
        )
    }
}


export default Particulars;