import React from 'react';
import { connect } from 'dva';
import { BackTop, Button, Card, Checkbox, Form, Icon, Input, Select, AutoComplete, message, DatePicker, Row, Col, InputNumber } from 'antd';
import ReportInfo from '@/pages/ReportManager/HandleReport/ReportInfo';

@connect(({ valvereport: { valveinfo }, loading }) => ({
    valveinfo,
    loading: loading.effects['valvereport/getValveReportInfo'],
}))

class ReportPrint extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            reportNo: ''
        };
    }


    componentDidMount() {
        this.getReportDetailInfo();
    }

    getReportDetailInfo() {
        const { location, dispatch } = this.props;
        const { report } = location.query;
        let reportno
        if (report) {
            sessionStorage.setItem('printreportno', report);
            reportno = report
        } else {
            reportno = sessionStorage.getItem('printreportno');
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
        const { valveinfo } = this.props;
        return (
            <Card bordered={false}>
                <div style={{ width: '100%', position: 'relative' }}>
                    <div style={{ width: '80%', marginLeft: '10%' }}>
                        <Button  type="primary" onClick={() => window.print()} style={{ marginBottom: 10, marginTop: 10 }}>打印</Button>
                        <ReportInfo valveinfo={valveinfo} />
                    </div>
                </div>
            </Card>

        );
    }
}


export default ReportPrint;

