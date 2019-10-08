import React, { PureComponent } from 'react';
import styles from './styles.less';



class ReportInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { valveinfo: { reportInfo, historyInfo } } = this.props;
    let checkExplain = '';
    if (reportInfo.checkExplain != undefined) {
      checkExplain = reportInfo.checkExplain.replace(/ /g, ";<br/>");
    }

    let checkTime = '';
    let approveTime = '';
    if (historyInfo.checkTime != undefined) {// 14
      checkTime = historyInfo.checkTime.substring(0, 10).replace('/', '&emsp;<b>年</b>&emsp;');
      checkTime = checkTime.substring(0, 26) + checkTime.substring(27, checkTime.length);
      checkTime = checkTime.slice(0, 26) + '&emsp;<b>月</b>&emsp;' + checkTime.slice(26) + '&emsp;<b>日</b>';
    }
    if (historyInfo.approveTime != undefined) {
      approveTime = historyInfo.approveTime.substring(0, 10).replace('/', '&emsp;<b>年</b>&emsp;');
      approveTime = approveTime.substring(0, 26) + approveTime.substring(27, approveTime.length);
      approveTime = approveTime.slice(0, 26) + '&emsp;<b>月</b>&emsp;' + approveTime.slice(26) + '&emsp;<b>日</b>';
    }


    return (
      <div>
        <p>
          <span style={{float:'left' }}>文件编号：<b style={{ color: 'dodgerblue' }}>GTXJ-B-F01-B/0</b></span>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        ·<span style={{ float:'right' }}>报告编号：<b style={{ color: 'dodgerblue' }}>{reportInfo.reportNo}</b></span>
        </p>
        <h2>
          <center>广西壮族自治区特种设备检验研究院安全阀校验报告</center>
        </h2>
        <table
          style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
          border={1}
          cellPadding={5}
        >
          <tbody>
            <tr>
              <th>使用单位</th>
              <td colSpan={3}>{reportInfo.companyUse}</td>
            </tr>
            <tr>
              <th>单位地址</th>
              <td colSpan={3}>{reportInfo.companyAddress}</td>
            </tr>
            <tr>
              <th>联系人</th>
              <td>{reportInfo.companyContacts}</td>
              <th>联系电话</th>
              <td>{reportInfo.telephone}</td>
            </tr>
            <tr>
              <th>安全阀出厂编号</th>
              <td>{reportInfo.deviceNo}</td>
              <th>安装位置</th>
              <td>{reportInfo.installLocation}</td>
            </tr>
            <tr>
              <th>安全阀类型</th>
              <td>{reportInfo.valveType}</td>
              <th>安全阀型号</th>
              <td>{reportInfo.valveModel}</td>
            </tr>
            <tr>
              <th>工作压力</th>
              <td>{reportInfo.workPressure} </td>
              <th>工作介质</th>
              <td>{reportInfo.workMedium}</td>
            </tr>
            <tr>
              <th>要求整定压力</th>
              <td>{reportInfo.requireSettingPressure} </td>
              <th>执行标准</th>
              <td>{reportInfo.standard}</td>
            </tr>
            <tr>
              <th>校验方式</th>
              <td>{reportInfo.checkMode}</td>
              <th>校验介质</th>
              <td>{reportInfo.checkMedium}</td>
            </tr>
            <tr>
              <th>整定压力</th>
              <td>{reportInfo.settingPressure}</td>
              <th>密封试验压力</th>
              <td>{reportInfo.sealTestPressure} </td>
            </tr>
            <tr>
              <th>校验结果</th>
              <td colSpan={3}>{reportInfo.checkResult}</td>
            </tr>
            <tr>
              <th>备注</th>
              <td colSpan={3}>{reportInfo.remarks}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <b>维护检修情况说明：</b>
                <div dangerouslySetInnerHTML={{ __html: `${checkExplain}` }} />
              </td>
            </tr>
            <tr>
              <th>校验日期</th>
              <td>&emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日</td>
              <th>下次校验日期</th>
              <td>&emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <b>校验:</b>{reportInfo.checkSignatureUrl != null ? <img src={reportInfo.checkSignatureUrl} className={styles.nameIMg} /> : null} <br />
                <b>日期：</b><div className={styles.Check} dangerouslySetInnerHTML={{ __html: `${checkTime}` }} />
              </td>
              <td colSpan={2} rowSpan={2}>
                <p>检验机构核准证号：TS7110338-2020</p>
                <p />
                <center>检验机构检验专用章</center>
                <center>年&emsp;&emsp;月&emsp;&emsp;日</center>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <b>审批:</b>{reportInfo.approveSignatureUrl != null ? <img src={reportInfo.approveSignatureUrl} className={styles.nameIMg} /> : null}<br />
                <b>日期：</b><div className={styles.Check} dangerouslySetInnerHTML={{ __html: `${approveTime}` }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}

export default ReportInfo;




