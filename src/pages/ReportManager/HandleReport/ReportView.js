import React, { PureComponent } from 'react';
import { connect} from 'dva';
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


    render() {
        const { valveinfo: { reportInfo } } = this.props;
        const reportNo = reportInfo.reportNo;
        return (
            <PageHeaderWrapper>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Link
                        to={{ pathname: '/report/handlereport/reportprint', report: `${reportNo}` }}
                        //target="_blank"
                        style={{ marginRight: 10 }}
                    >
                        <Button>打印</Button>
                    </Link>

                    <Button
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
                            fileDownload.download = '报告详情.doc';
                            fileDownload.click();
                            document.body.removeChild(fileDownload);
                        }}
                    >
                        导出
                    </Button>
                </div>
                <div ref={this.ref}>
                    <Card bordered={false}>
                        <ReportInfo {...reportInfo} />
                    </Card>
                </div>
                <BackTop />
            </PageHeaderWrapper>
        )
    }
}
export default ReportView;