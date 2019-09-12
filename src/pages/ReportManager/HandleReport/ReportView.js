import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { BackTop, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ReportInfo from './ReportInfo';


@connect(({ valvereport: { valveinfo }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))

class ReportView extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.getReportDetailInfo();
    }

    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const { report } = location;
        let reportno
        if (report) {
            sessionStorage.setItem('viewreportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('viewreportno');
        }
        this.setState({
            reportNo: reportno,
        });

        dispatch({
            type: 'valvereport/getValveReportInfo',
            payload: reportno,
        });

    }


    // handle() {
    //     const w = window.open('about:blank');
    //     w.location.href = `/report/handle/reportprint`;
    // }

    render() {
        const { valveinfo, valveinfo: { reportInfo, historyInfo } } = this.props;
        const reportNo = reportInfo.reportNo;
        return (
            <PageHeaderWrapper>
                {historyInfo.modifyFlag == '5' ?
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <Link
                            to={`/print?report=${reportNo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginRight: 10 }}
                        >
                            <Button type="primary">打印</Button>
                        </Link>
                        <Button
                            type="primary"
                            onClick={() => {
                                const header =
                                    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                                    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                                    "xmlns='http://www.w3.org/TR/REC-html40'>" +
                                    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
                                const footer = '</body></html>';
                                const sourceHTML = header + this.ref.current.innerHTML + footer;
                                const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(
                                    sourceHTML
                                )}`;
                                const fileDownload = document.createElement('a');
                                document.body.appendChild(fileDownload);
                                fileDownload.href = source;
                                fileDownload.download = `报告-${reportNo}.doc`;
                                fileDownload.click();
                                document.body.removeChild(fileDownload);
                            }}
                        >
                            导出
                    </Button>
                    </div>
                    : null}
                <div ref={this.ref}>
                    <Card bordered={false}>
                        <ReportInfo valveinfo={valveinfo} />
                    </Card>
                </div>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}
export default ReportView;