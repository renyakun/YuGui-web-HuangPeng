import Particulars from '@/common/Report/Particulars';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { checkResult } from '@/services/valverserver';
import { BackTop, Button, Card, Input, message, Popover, Radio, Steps, Modal } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import React, { Fragment, PureComponent } from 'react';
import styles from './styles.less';
import Draw from '@/utils/draw';
import SignatureCanvas from 'react-signature-canvas';

const { Step } = Steps;
const RadioGroup = Radio.Group;

@connect(({ valvereport: { valveinfo, }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))

class DetailWaitCheck extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            realname: '',
            reportNo: '',
            agree: true,
            reason: '',
            visible: false,
            currentStep: 0,
            mycolor: 'black',
        }
    }

    componentDidMount() {
        this.getReportDetailInfo();
    };

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

    };

    handleInput(e) {
        this.setState({
            reason: e.target.value,
        });

    };

    async handleCommit() {
        const { agree, reason, reportNo } = this.state;
        let flag = 2
        if (!agree) {
            flag = 12
        }
        if (reason != '' || agree) {
            const res = await checkResult({ reportNo, reason, flag });
            if (res) {
                if (res.ok) {
                    message
                        .loading('正在提交', 2)
                        .then(() => message.success('提交成功', 1))
                        .then(() => message.success('自动为你跳转', 1));
                    this.setState({
                        welcome: false,
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
            setTimeout(() => {
                this.props.dispatch(
                    routerRedux.push({
                        pathname: '/workplatform/mytask',
                    })
                )
            }, 3000);
            this.setState({
                visible: false,
            });
        }
    };

    onChange = (e) => {
        this.setState({
            agree: e.target.value,
        });
    };

    OnCancel = (currentStep) => {
        this.setState({
            visible: false,
            currentStep: 0
        });
    };

    handleClick = () => {
        this.setState({
            visible: true
        })
    };

    backward = (currentStep) => {
        this.setState({
            currentStep: currentStep - 1,
        });
    };

    handleNext = (currentStep) => {
        if (currentStep < 2) {
            this.forward(currentStep);
        } else {
            this.OnCancel(currentStep);
            //this.handleCommit();
        }
    };

    forward = (currentStep) => {
        this.setState({
            currentStep: currentStep + 1,
        });
    };

    getHorizontalStyle() {

        const d = document;
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
        let length = (h - w) / 2;
        let width = w;
        let height = h;

        switch (this.degree) {
            case -90:
                length = -length;
            case 90:
                width = h;
                height = w;
                break;
            default:
                length = 0;
        }

        if (this.canvasBox) {
            this.canvasBox.removeChild(document.querySelector('canvas'));
            this.canvasBox.appendChild(document.createElement('canvas'));
            setTimeout(() => {
                this.initCanvas();
            }, 200);
        }

        return {
            transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
            width: `${width}px`,
            height: `${height}px`,
            transformOrigin: 'center center',
        };
    }

    initCanvas = (e) => {
        const canvas = e.target.className;
        this.draw = new Draw(canvas, -this.degree);
    }

    handleMouseDown = (e) => {

    }

    renderContent = (currentStep) => {
        if (currentStep === 1) {
            return 987654321
        }
        if (currentStep === 2) {
            return 654321789
        }
        return [
            <div className="container" >
                <div id="canvasBox" >
                    <SignatureCanvas penColor='green' canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
                </div>
            </div>
        ]
    };

    // style={this.getHorizontalStyle} style={getsty}style={{ height: 300, background: '#ccc' }} onMouseDown={this.handleMouseDown}
    renderFooter = currentStep => {
        if (currentStep === 1) {
            return [
                <Button key="back" style={{ float: 'left' }} onClick={() => this.backward(currentStep)}>
                    上一步
            </Button>,
                <Button key="cancel" onClick={this.OnCancel}>
                    取消
            </Button>,
                <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
                    下一步
            </Button>,
            ];
        }
        if (currentStep === 2) {
            return [
                <Button key="back" style={{ float: 'left' }} onClick={() => this.backward(currentStep)}>
                    上一步
            </Button>,
                <Button key="cancel" onClick={this.OnCancel}>
                    取消
            </Button>,
                <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
                    完成
            </Button>,
            ];
        }
        return [
            <Button key="cancel" onClick={this.OnCancel}>
                取消
          </Button>,
            <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
                下一步
          </Button>,
        ];
    };

    render() {
        const { welcome, reason, agree, visible, currentStep } = this.state;
        const { valveinfo: { reportInfo, historyInfo, }, loading } = this.props;
        let flag = 0;
        if (historyInfo) { const { modifyFlag } = historyInfo; flag = modifyFlag; }
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
                    </Fragment>
                </div>
            );
        }

        return (
            <PageHeaderWrapper>
                <Card bordered={false} title="基础信息" loading={loading}>
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
                    <Card title="提交审核" style={{ marginTop: 24 }} bordered={false}>
                        <div style={{ marginBottom: 24 }}>
                            <RadioGroup onChange={this.onChange} value={this.state.agree}>
                                <Radio value={true}>审核通过</Radio>
                                <Radio value={false}>审核不通过</Radio>
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
                                onClick={this.handleClick}
                                loading={loading}
                            >
                                提交
                            </Button>
                        </div>

                        <Modal
                            title="修改内容"
                            visible={visible}
                            onCancel={this.OnCancel}
                            maskClosable={false}
                            destroyOnClose
                            centered
                            footer={null}
                            width={800}
                            footer={this.renderFooter(currentStep)}
                        >
                            <Fragment>
                                <Steps style={{ marginBottom: 28 }} current={currentStep}>
                                    <Step title="填写电子签名" />
                                    <Step title="确认电子签名" />
                                    <Step title="完成" />
                                </Steps>
                                {this.renderContent(currentStep)}
                            </Fragment>
                            {/* <Button
                                size="large"
                                type="primary"
                                onClick={this.handleCommit.bind(this)}
                                loading={loading}
                            >
                                提交
                            </Button> */}
                        </Modal>

                    </Card>
                </div>
                <div style={{ display: welcome ? 'none' : 'block' }}>
                    <Card title="审核结果" style={{ marginTop: 24 }} bordered={false}>
                        <div style={{ display: agree ? 'none' : 'block', fontWeight: 'bolder', color: 'dodgerblue' }}>
                            <div><b className={styles.Fontwg}>审核不通过</b>  <p style={{ display: 'inline-block', color: 'black' }}>理由:</p><em className={styles.Fontwg} style={{ color: 'red' }}>{reason}</em></div>
                        </div>
                        <div style={{ display: agree ? 'block' : 'none', fontWeight: 'bolder', color: 'dodgerblue' }}>审核通过</div>
                    </Card>
                </div>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}

export default DetailWaitCheck;