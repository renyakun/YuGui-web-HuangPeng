import ModifyReport from '@/common/Report/ModifyReport';
import Particulars from '@/common/Report/Particulars';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { addNotifyApproveUser } from '@/services/valverserver';
import { BackTop, Button, Card, Form, Input, message, Switch, Steps, Popover } from 'antd';
import { connect } from 'dva';
import React, { PureComponent, Fragment } from 'react';
import Link from 'umi/link';
import styles from './styles.less';
import { routerRedux } from 'dva/router';

const { Step } = Steps;

@connect(({ valvereport: { valveinfo, checkuserlist }, loading }) => ({
    valveinfo,
    checkuserlist,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))

@Form.create()
class ModifyReportCheck extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            visible: false,
            checkuser: '',
            userName: '',
            reportNo: '',
            reportInformation: [],
            disabled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.valveinfo.reportInfo != this.props.valveinfo.reportInfo) {
            this.setState({
                reportInformation: nextProps.valveinfo.reportInfo,
                userName: nextProps.valveinfo.historyInfo.approveName
            })
        }
    }

    componentDidMount() {
        this.getReportDetailInfo();
        this.fetchCheckUserList();
    }

    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const { report } = location;
        let reportno
        if (report) {
            sessionStorage.setItem('modifycheckreportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('modifycheckreportno');
        }
        this.setState({
            reportNo: reportno,
        });

        dispatch({
            type: 'valvereport/getValveReportInfo',
            payload: reportno,
        });

    }

    fetchCheckUserList() {
        this.props.dispatch({
            type: 'valvereport/fetchApproveUserList',
        });
    }

    async handleCommit() {
        this.setState({
            disabled: true
        })
        // const { checkuser, reportNo } = this.state;
        const { userName, reportNo } = this.state;
        //let userName = checkuser
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
                            pathname: '/report/myList/approvelist',
                        })
                    )
                }, 3000);
            } else {
                message.error(res.errMsg);
            }
        }
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    }

    getChildMsg(flag, report) {
        setTimeout(() => {
            this.props.dispatch({
                type: 'valvereport/getValveReportInfo',
                payload: report,
            });
        }, 500)

        if (flag) {
            this.setState({ visible: false });
        }
    }

    render() {
        const { welcome, checkuser, userName, visible, reportInformation,disabled } = this.state;
        const { valveinfo: { reportInfo, historyInfo, }, checkuserlist, loading, } = this.props;

        let flag = 0;
        if (historyInfo) { const { modifyFlag } = historyInfo; flag = modifyFlag; }

        const popoverContent = (<div style={{ width: 160 }}>耗时：2小时25分钟</div>);

        const customDot = (dot, { status }) =>
            status === 'process' ? (<Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>{dot}</Popover>
            ) : (dot);

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
        if (flag >= 2) {
            desc3 = (
                <div >
                    <Fragment>
                        复批人:{userName}
                    </Fragment>
                </div>
            );
        }

        return (
            <PageHeaderWrapper>
                <Card title="报告详情" loading={loading} >
                    <div style={{ position: 'relative' }}>
                        <Switch className={styles.Buttons} onClick={this.showModal} checkedChildren='修改报告' unCheckedChildren='修改报告' defaultChecked={visible} />
                        <Particulars reportInfo={reportInfo} />
                        <ModifyReport
                            visible={visible}
                            title="修改报告"
                            reportInformation={reportInformation}
                            callback={this.getChildMsg.bind(this)}
                            onCancel={this.handleCancel}
                        />
                    </div>
                </Card>

                <Card title="流程进度" style={{ marginTop: 24 }} bordered={false}>
                    <Steps direction='horizontal' progressDot={customDot} current={flag}>
                        <Step title="新建报告" description={desc1} />
                        <Step title="审核报告" description={desc2} />
                        <Step title="复批报告" description={desc3} />
                        <Step title="归档报告" />
                    </Steps>
                </Card>

                <div style={{ display: welcome ? 'block' : 'none' }}>
                    <Card title="提交审批" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            选择审批人：
                            <Input value={userName} readOnly style={{ width: '10%', marginLeft: 10, marginRight: 20, border: false }} />
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
                <BackTop />
            </PageHeaderWrapper >
        );
    }
}

export default ModifyReportCheck;
