import Particulars from '@/common/Report/Particulars';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { addFileReport } from '@/services/valverserver';
import { Button, Card, message, Popover, Select, Steps } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import Link from 'umi/link';
import styles from './styles.less';
import { routerRedux } from 'dva/router';

const { Step } = Steps;
const SelectOption = Select.Option;


@connect(({ valvereport: { valveinfo }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))


class ReportDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            reportNo: '',
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
            sessionStorage.setItem('approvereportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('approvereportno');
        }
        this.setState({
            reportNo: reportno,
        });

        dispatch({
            type: 'valvereport/getValveReportInfo',
            payload: reportno,
        });

    }

    async handleCommit() {
        const { reportNo } = this.state;
        const res = await addFileReport({ reportNo });
        if (res) {
            if (res.ok) {
                message
                    .loading('正在归档', 2)
                    .then(() => message.success('归档成功', 1))
                    .then(() => message.success('自动为你跳转', 1));
                this.setState({
                    welcome: false,
                });
                setTimeout(() => {
                    this.props.dispatch(
                        routerRedux.push({
                            pathname: '/report/myList/approvelist',
                        })
                    )
                }, 3000);
            } else {
                message.error(res.errMsg);
            }
        }
    }


    render() {
        const { welcome, } = this.state;
        const { valveinfo: { reportInfo, historyInfo, }, loading } = this.props;
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
        let desc3 = null
        if (flag >= 0) {
            desc1 = (
                <div >
                    <Fragment>
                        创建人:{historyInfo["createName"]}
                    </Fragment>
                    <div>{historyInfo["createTime"]}</div>
                </div>
            );
        }
        if (flag >= 2) {
            desc2 = (
                <div >
                    <Fragment>
                        审核人:{historyInfo["checkName"]}
                    </Fragment>
                    <div>{historyInfo["checkTime"]}</div>
                </div>
            );
        }

        if (flag >= 4) {
            desc3 = (
                <div >
                    <Fragment>
                        审批人:{historyInfo["approveName"]}
                    </Fragment>
                    <div>{historyInfo["approveTime"]}</div>
                </div>
            );
        }

        flag = flag - 2
        return (
            <PageHeaderWrapper>
                <Card title="报告详情" loading={loading}>
                    <Particulars reportInfo={reportInfo} />
                </Card>

                <Card title="流程进度" style={{ marginTop: 24 }} bordered={false}>
                    <Steps direction='horizontal' progressDot={customDot} current={flag}>
                        <Step title="新建报告" description={desc1} />
                        <Step title="审核报告" description={desc2} />
                        <Step title="审批报告" description={desc3} />
                        <Step title="归档报告" />
                    </Steps>
                </Card>

                <div style={{ display: welcome ? 'block' : 'none' }}>
                    <Card title="提交归档" style={{ marginTop: 24 }} bordered={false}>
                        <Button
                            size="large"
                            type="primary"
                            onClick={this.handleCommit.bind(this)}
                            loading={loading}
                        >
                            提交
                        </Button>

                    </Card>
                </div>
                <div style={{ display: welcome ? 'none' : 'block' }}>
                    <Card title="已经提交归档" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            <h4 style={{ color: 'dodgerblue', fontWeight: 'bolder' }}>已归档</h4>
                        </div>
                    </Card>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default ReportDetail;
