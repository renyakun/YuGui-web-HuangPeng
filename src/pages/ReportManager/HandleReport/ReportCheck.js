import { reportListLabels } from '@/common/labels';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { addNotifyApproveUser } from '@/services/valverserver';
import { Button, Card, message, Popover, Select, Steps } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import styles from './styles.less';

const { Description } = DescriptionList;
const { Step } = Steps;
const SelectOption = Select.Option;
const reportListKeys = Object.keys(reportListLabels);

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
            realname: '',
            reportNo: '',
        }
    }
    componentDidMount() {
        this.getReportDetailInfo();
        this.fetchApproveUserList();
    }
    

    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const {  report } = location; 
        let reportno
        if(report){
           sessionStorage.setItem('detailreportno',report); 
           reportno = report
        }else {
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
                realname: user.realName,
            });
        }
    }


    async handleCommit() {
        const { approveuser, reportNo } = this.state;
        let userName = approveuser

        const res = await addNotifyApproveUser({ userName, reportNo });

        if (res) {
            if (res.ok) {
                message.success('已将报告向审批人员提交');
                this.setState({
                    welcome: false,
                });
            } else {
                message.error(res.errMsg);
            }
        }
    }


    render() {
        const {
            welcome,
            approveuser,
            realname,
        } = this.state;
        const { valveinfo: { reportInfo, historyInfo, }, approveuserlist, loading } = this.props;
        console.log("approveuserlist:", approveuserlist)
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
                <Card title="基础信息" loading={loading}>
                    <DescriptionList style={{ marginBottom: 24 }}>
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
                    <Card title="提交审批" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            选择审批人：
               <Select
                                className={styles.input}
                                placeholder="请选择报告审批人员"
                                onChange={this.handleSelect.bind(this)}
                                allowClear
                            >
                                {approveuserlist.map(item => <SelectOption key={item.userName}>{item.realName}</SelectOption>)}
                            </Select>
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
                    <Card title="已经提交审核" style={{ marginTop: 24 }} bordered={false}>
                        <div className={styles.inputs}>
                            审核人:{realname}
                        </div>

                    </Card>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default ReportCheck;
