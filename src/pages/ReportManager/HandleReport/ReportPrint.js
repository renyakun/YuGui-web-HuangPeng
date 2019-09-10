import React from 'react';
import { connect } from 'dva';
import ReportInfo from './ReportInfo';

@connect(({ valvereport: { valveinfo }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))

class ReportPrint extends React.Component {

    componentDidMount() {
        this.getReportDetailInfo();
        console.log(window.location)
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
        return (
            <div style={{ textAlign: 'center' }}>
                <button onClick={() => window.print()} style={{ marginBottom: 10 }}>打印</button>
                <ReportInfo {...reportInfo} />
            </div>
        );
    }
}
export default ReportPrint;







