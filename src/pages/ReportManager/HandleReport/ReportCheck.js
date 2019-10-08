import Particulars from '@/common/Report/Particulars';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { addNotifyApproveUser } from '@/services/valverserver';
import { Button, Card, message, Popover, Select, Steps } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import Link from 'umi/link';
import styles from './styles.less';
import { routerRedux } from 'dva/router';

const { Step } = Steps;
const SelectOption = Select.Option;

@connect(({ valvereport: { valveinfo, approveuserlist }, loading }) => ({
    valveinfo,
    approveuserlist,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))


class ReportCheck extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            approveuser: '',
            userName: '',
            reportNo: '',
            disabled: false
        }
    }
    componentDidMount() {
        this.getReportDetailInfo();
        this.fetchApproveUserList();
    }


    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const { report } = location;
        let reportno
        if (report) {
            sessionStorage.setItem('checkreportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('checkreportno');
        }
        this.setState({
            reportNo: reportno,
        });

        dispatch({
            type: 'valvereport/getValveReportInfo',
            payload: reportno,
        });

    }


    fetchApproveUserList() {
        this.props.dispatch({
            type: 'valvereport/fetchApproveUserList',
        });
    }


    handleSelect(value) {
        const id = value;
        if (id) {
            const user = this.props.approveuserlist.find(item => item.userName === id);
            this.setState({
                approveuser: id,
                userName: user.userName,
            });
        }
    }


    async handleCommit() {
        this.setState({
            disabled: true
        })
        const { approveuser, reportNo } = this.state;
        let userName = approveuser
        const res = await addNotifyApproveUser({ userName, reportNo });
        if (res) {
            if (res.ok) {
                message
                    .loading(`已将报告向${userName}提交`, 2)
                    .then(() => message.success('提交成功', 1))
                    .then(() => message.success('自动为你跳转', 1));
                this.setState({
                    welcome: false,
                });
                setTimeout(() => {
                    this.props.dispatch(
                        routerRedux.push({
                            pathname: '/report/myList/checkedlist',
                        })
                    )
                }, 3000);
            } else {
                message.error(res.errMsg);
            }
        }
    }


    render() {
        const { welcome, approveuser, userName, disabled} = this.state;
        const { valveinfo: { reportInfo, historyInfo, }, approveuserlist, loading } = this.props;
        let flag = 0;
        if (historyInfo) { const { modifyFlag } = historyInfo; flag = modifyFlag; }
        const popoverContent = (<div style={{ width: 160 }}>耗时：2小时25分钟</div>);

        const customDot = (dot, { status }) =>
            status === 'process' ? (<Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>{dot}</Popover>
            ) : (dot);

        let desc1 = null
        let desc2 = null

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
        if (flag >= 1) {
            desc2 = (
                <div >
                    <Fragment>
                        审核人:{historyInfo["checkName"]}
                    </Fragment>
                    <div>{historyInfo["checkTime"]}</div>
                </div>
            );
        }

        return (
            <PageHeaderWrapper>
                <Card title="报告详情" loading={loading}>
                    <Particulars reportInfo={reportInfo} />
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
                    <Card title="提交审批" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            选择审批人：
                            <Select
                                className={styles.input}
                                placeholder="请选择报告审批人员"
                                onChange={this.handleSelect.bind(this)}
                            >
                                {approveuserlist.map(item => <SelectOption key={item.userName}>{item.userName}</SelectOption>)}
                            </Select>
                            <Button
                                size="large"
                                type="primary"
                                onClick={this.handleCommit.bind(this)}
                                loading={loading}
                                disabled={disabled}
                            >
                                提交
                                </Button>
                        </div>

                    </Card>
                </div>
                <div style={{ display: welcome ? 'none' : 'block' }}>
                    <Card title="已经提交审批" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            <h4>审批人:</h4><span className={styles.Fontwg}>{userName}</span>
                        </div>
                    </Card>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default ReportCheck;
