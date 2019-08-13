import React from 'react';
import { connect } from 'dva';
import qs from 'qs';
import Report from './Report';

@connect(({ valvereport: { valveinfo }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))
export default class ReportPrint extends React.Component {
    //   componentDidMount() {
    //     const { location } = this.props;
    //     const { reportNo } = qs.parse(location.search, { ignoreQueryPrefix: true });
    //     this.props.dispatch({
    //       type: 'valvereport/getValveReportInfo',
    //       payload: reportNo,
    //     });
    //   }

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
        // const { location, valveinfo } = this.props;
        // const valvereport = {
        //     ...valveinfo.valvereport,
        //     reportNo: qs.parse(location.search, { ignoreQueryPrefix: true }).reportNo,
        // };
        const { valveinfo: { reportInfo } } = this.props;
        return (
            <>
                <button onClick={() => window.print()}>打印</button>
                <Report {...reportInfo} />
            </>
        );
    }
}
