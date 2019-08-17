import { reportListLabels } from '@/common/labels';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {approveResult} from '@/services/valverserver';
import { BackTop, Button, Card, Input, message, Popover, Radio, Steps } from 'antd';
import { connect } from 'dva';
import React, { PureComponent, Fragment } from 'react';

const { Description } = DescriptionList;
const { Step } = Steps;
const RadioGroup = Radio.Group;
const reportListKeys = Object.keys(reportListLabels);

@connect(({ valvereport: { valveinfo, }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))


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


    componentDidMount() {
        this.getReportDetailInfo();
    }


    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const { report } = location;
        let reportno
        if (report) {
            sessionStorage.setItem('detailreportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('detailreportno');
        }
        this.setState({
            reportNo: reportno,
        });

        dispatch({
            type: 'valvereport/getValveReportInfo',
            payload: reportno,
        });

    }

    handleInput(e) {
        this.setState({
            reason: e.target.value,
        });

    }

    async handleCommit() {
        const { agree, reason, reportNo } = this.state;

        console.log('reason', reason);
        console.log('agree', agree);
        let flag = 4
        if (!agree) {
            flag = 14
        }

        const res = await approveResult({ reportNo, reason, flag });

        if (res) {
            if (res.ok) {
                message.success('审批通过');
                this.setState({
                    welcome: false,
                });
            } else {
                message.error(res.errMsg);
            }
        }
    }

    onChange = (e) => {
        this.setState({
            agree: e.target.value,
        });
    }


    render() {
        const {
            welcome,
            agree,
        } = this.state;

        const { valveinfo: { reportInfo, historyInfo, }, loading } = this.props;
        console.log("welcome:", historyInfo)
        let flag = 0;
        if (historyInfo) {
            const { modifyFlag } = historyInfo
            flag = modifyFlag;
        }
        const popoverContent = (
            <div style={{ width: 160 }}>
                耗时：2小时25分钟
          </div>
        );

        const customDot = (dot, { status }) =>
            status === 'process' ? (
                <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
                    {dot}
                </Popover>
            ) : (
                    dot
                );

        let desc1 = null
        let desc2 = null
        flag = flag - 2
        if (flag >= 0) {
            desc1 = (
                <div >
                    <Fragment>
                        创建人:{historyInfo["createRealName"]}
                    </Fragment>
                    <div>{historyInfo["createTime"]}</div>
                </div>
            );
        }
        if (flag >= 1) {
            desc2 = (
                <div >
                    <Fragment>
                        审核人:{historyInfo["checkRealName"]}
                    </Fragment>
                    <div>{historyInfo["checkTime"]}</div>
                </div>
            );
        }


        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="基础信息">
                    <DescriptionList>
                        {reportListKeys.map((item, i) => (
                            <Description key={item} term={reportListLabels[item]}>
                                {reportListLabels[item] == "维护检修情况说明" ? reportInfo[item] + "" : reportInfo[item]}
                            </Description>
                        ))}
                    </DescriptionList>
                </Card>
                <Card title="流程进度" style={{ marginTop: 24 }} bordered={false}>
                    <Steps direction='horizontal' progressDot={customDot} current={flag}>
                        <Step title="新建报告" description={desc1} />
                        <Step title="审核报告" description={desc2} />
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
                                onClick={this.handleCommit.bind(this)}
                                loading={loading}
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