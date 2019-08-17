import React from 'react';

export default function ReportInfo(props) {
  return (
    <div>
      <p>
        <span>文件编号：GTXJ-B-F01-B/0</span>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <span>报告编号：{props.reportNo}</span>
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
            <td colSpan={3}>{props.companyUse}</td>
          </tr>
          <tr>
            <th>单位地址</th>
            <td colSpan={3}>{props.companyAddress}</td>
          </tr>
          <tr>
            <th>联系人</th>
            <td>{props.companyContacts}</td>
            <th>联系电话</th>
            <td>{props.telephone}</td>
          </tr>
          <tr>
            <th>设备代码/出厂编号</th>
            <td>{props.deviceNo}</td>
            <th>安装位置</th>
            <td>{props.installLocation}</td>
          </tr>
          <tr>
            <th>安全阀类型</th>
            <td>{props.valveType}</td>
            <th>安全阀型号</th>
            <td>{props.valveModel}</td>
          </tr>
          <tr>
            <th>工作压力</th>
            <td>{props.workPressure} MPa</td>
            <th>工作介质</th>
            <td>{props.workMedium}</td>
          </tr>
          <tr>
            <th>要求整定压力</th>
            <td>{props.requireSettingPressure} MPa</td>
            <th>执行标准</th>
            <td>{props.standard}</td>
          </tr>
          <tr>
            <th>校验方式</th>
            <td>{props.checkMode}</td>
            <th>校验介质</th>
            <td>{props.checkMedium}</td>
          </tr>
          <tr>
            <th>整定压力</th>
            <td>{props.settingPressure}MPa</td>
            <th>密封试验压力</th>
            <td>{props.sealTestPressure} MPa</td>
          </tr>
          <tr>
            <th>校验结果</th>
            <td colSpan={3}>{props.checkResult}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colSpan={3}>{props.remarks}</td>
          </tr>
          <tr>
            <td td colSpan={4}>
              <p>维护检修情况说明：</p>
              <p>{props.checkExplain}</p>
              <br />
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
              校验：&emsp;&emsp;&emsp;&emsp;日期：&emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日
            </td>
            <td colSpan={2}>
              <p>检验机构核准证号：TS7110338-2020</p>
              <p />
              <center>检验机构检验专用章</center>
              <center>年&emsp;&emsp;月&emsp;&emsp;日</center>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              审批：&emsp;&emsp;&emsp;&emsp;日期：&emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp;&emsp;日
            </td>
            <td colSpan={2} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}




// import React from 'react';
// import { Card, Descriptions } from 'antd';

// const DescriptionsItem = Descriptions.Item;

// function ReportInfo(props) {

//   return (
//     <Card bordered={false} >
//       <div className="tableheader" >
//         <p>
//           <span>文件编号：GTXJ-B-F01-B/0</span>
//           &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
//          <span>报告编号：{props.reportNo}</span>
//         </p>
//         <h2>
//           <center>广西壮族自治区特种设备检验研究院安全阀校验报告</center>
//         </h2>
//       </div>


//     </Card>
//   )
// }


// export default ReportInfo;
