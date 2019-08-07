import { reportList } from '@/common/data';
import { reportListLabels } from '@/common/labels';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { BackTop, Button, Card, Input, Radio, Steps } from 'antd';
import React, { PureComponent } from 'react';

const { Description } = DescriptionList;
const { Step } = Steps;
const RadioGroup = Radio.Group;

const reportListKeys = Object.keys(reportListLabels);

class DetailWaitApproveReport extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            realname: '',
            reportNo: '',
            agree: true,
            reason: '',
        }
    }

    handleInput(e) {
        this.setState({
            reason: e.target.value,
        });

    }

    onChange = (e) => {
        this.setState({
            agree: e.target.value,
        });
    }




    render() {
        const {
            welcome,
            realname,
            agree,
        } = this.state;
        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="基础信息">
                    <DescriptionList>
                        {reportListKeys.map((item, i) => (
                            <Description key={item} term={reportListLabels[item]}>
                                {reportListLabels[item] == "维护检修情况说明" ? reportList[item] + "" : reportList[item] }
                            </Description>
                        ))}
                    </DescriptionList>
                </Card>
                <Card bordered={false} title="流程进度" style={{ marginTop: 24 }}>
                    <Steps direction='horizontal' >
                        <Step title="新建报告" />
                        <Step title="审核报告" />
                        <Step title="审批报告" />
                        <Step title="归档报告" />
                    </Steps>
                </Card>

                <div style={{ display: welcome ? 'block' : 'none' }}>
                    <Card title="提交审核" style={{ marginTop: 24 }} bordered={false}>
                        <div style={{ marginBottom: 24 }}>
                            <RadioGroup onChange={this.onChange} value={this.state.agree}>
                                <Radio value={true}>审批通过</Radio>
                                <Radio value={false}>审批不通过</Radio>
                            </RadioGroup>
                        </div>

                        <div style={{ display: agree ? 'none' : 'block' }}>
                            <Input
                                size="large"
                                placeholder="请输入不通过理由"
                                onChange={this.handleInput.bind(this)}
                            />

                        </div>

                        <div style={{ marginTop: 24 }}>
                            <Button
                                size="large"
                                type="primary"
                            //onClick={this.handleCommit.bind(this)}
                            //loading={loading}
                            >
                                提交
                            </Button>
                        </div>

                    </Card>
                </div>
                <div style={{ display: welcome ? 'none' : 'block' }}>
                    <Card title="审核结果" style={{ marginTop: 24 }} bordered={false}>
                        <div style={{ display: agree ? 'none' : 'block' }}>
                            审批不通过
                        </div>
                        <div style={{ display: agree ? 'block' : 'none' }}>
                            审批通过
                        </div>
                    </Card>
                </div>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default DetailWaitApproveReport;