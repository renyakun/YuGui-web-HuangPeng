import { BackTop, Card, Collapse, } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import React, { PureComponent } from 'react';
import Link from 'umi/link';

const { Panel } = Collapse;

class UserManual extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const access = (
            <div style={{fontWeight:'lighter'}}>
                <p style={{ textIndent: "2em" }}>点击<Link style={{ color: '#436EEE', fontWeight: 'bolder' }} to={{ pathname: '/' }}>我的工作台</Link>，您将进入首页，首页有任务处理查看您有多少份报告待处理；</p>
                <p style={{ textIndent: "2em" }}> 点击<Link style={{ color: '#436EEE', fontWeight: 'bolder' }} to={{ pathname: '/report' }}>新建报告</Link>，您将新建报告页面，在这里您可以新建您的报告啦~</p>
                <p style={{ textIndent: "2em" }}>点击<Link style={{ color: '#436EEE', fontWeight: 'bolder' }} to={{ pathname: '/search' }}>搜索报告</Link>，您将进入的是所有报告的展示页面，您可以根据报告编号模糊查询出相关报告，或者根据报告处理人查询相关的报告，还可以根据报告的状态（有：待审核，待审批，审核通过，审核不通过，审批通过，审批不通过，报告已归档状态）还可以查看不通过的原因等</p>
                <p style={{ textIndent: "2em" }}>点击<Link style={{ color: '#436EEE', fontWeight: 'bolder' }} to={{ pathname: '/system/info' }}>个人信息</Link>，您可以查看个人的信息（用户名，电话，邮箱，职位等），在这里也可以修改个人相关信息。</p>
                <p style={{ textIndent: "2em" }}>点击<Link style={{ color: '#436EEE', fontWeight: 'bolder' }} to={{ pathname: '/company' }}>公司信息</Link>，您可以查看到所有与报告相关的企业信息，在新建报告时也可以自动展示！</p>
            </div>
        );
        const index = (
            <div style={{fontWeight:'lighter'}}>
                <h3>这里有：</h3>
                <p style={{ textIndent: "2em" }}>1.<b style={{ color: '#EE0000' }}>任务处理：</b> ①<b style={{ color: '#3A5FCD' }}>待审核报告</b> 有多少份待处理的？<br />
                    <span style={{ paddingLeft: 84, display: 'inline-block' }}>②</span><b style={{ color: '#3A5FCD' }}>待审批报告</b> 有多少份待处理的？</p>
                <p style={{ textIndent: "2em" }}>2.<b style={{ color: '#EE0000' }}>今日报告记录：</b>这里将展示的是今日新建了多少份报告，审核了多少份报告，审批了多少份报告，归档了多少份报告。</p>
                <p style={{ textIndent: "2em" }}>3.<b style={{ color: '#EE0000' }}>最新动态：</b>这里展示的是最新的三十条动态，即某某某最近操作了什么?</p>
                <p style={{ textIndent: "2em" }}>4.<b style={{ color: '#EE0000' }}>今日报告通过率：</b>这里展示的今日审核或者审批的报告通过率是多少(若报告全部通过后显示的将是100%)</p>
            </div>
        )
        const newly = (
            <div style={{fontWeight:'lighter'}}>
                <p style={{ textIndent: "2em" }}>点击快速入口后面的：<b style={{ color: '#3A5FCD' }}>新建报告</b>或者点击的左方任务栏 ：<b style={{ color: '#3A5FCD' }}>我的报告管理</b>-><b style={{ color: '#3A5FCD' }}>新建报告</b></p>
                <p style={{ textIndent: "2em" }}>即可进入新建报告的页面啦~~~<b style={{ color: '#EE0000' }}>ps:</b>新建报告成功后会直接跳到提交审核报告页面，您可以选择审核员或者管理员去提交审核报告。</p>
                <p style={{ textIndent: "2em" }}>如果暂时不想提交审核报告，可以再次点击新建报告新建您的第二份报告，这样您新建的报告将在左方任务栏 : <b style={{ color: '#3A5FCD' }}>我的报告管理</b>-><b style={{ color: '#3A5FCD' }}>新建报告列表展示</b></p>
            </div>
        )
        const user = (
            <div style={{fontWeight:'lighter'}}>
                <p style={{ textIndent: "2em" }}>操作路径：点击<b style={{ color: '#3A5FCD' }}>个人信息</b> -> <b style={{ color: '#3A5FCD' }}>用户列表</b> ->点击<b style={{ color: '#EE0000' }}>添加用户按钮</b>；就可以输入用户名（如：张三），密码（如：123456），职位（可以选择的职位有：1.审核员 2.审批员 3.文员）</p>
            </div>
        )
        const position = (
            <div style={{fontWeight:'lighter'}}>
                <p style={{ textIndent: "2em" }}>1.<b style={{ color: '#EE0000' }}>文员：</b>可以新建报告，也可以再次修改报告，向审核员提交审核报告，导出报告、打印报告（含有电子签名），查询报告等功能；</p>
                <p style={{ textIndent: "2em" }}>2.<b style={{ color: '#EE0000' }}>审核员：</b>可以新建报告，审核报告，修改审核未通过的报告，导出报告、打印报告（含有电子签名），查询报告等功能；</p>
                <p style={{ textIndent: "2em" }}>3.<b style={{ color: '#EE0000' }}>审批员：</b>可以新建报告，审批报告，修改审批未通过的报告，导出报告、打印报告（含有电子签名），查询报告等功能；</p>
                <p style={{ textIndent: "2em" }}>4.<b style={{ color: '#EE0000' }}>超级管理员：</b>具有一切所有权限管理功能（添加删除修改用户，添加删除修改企业等等）。</p>
            </div>
        )

        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition='right'>
                        <Panel header="Q:&nbsp;&nbsp;&nbsp;快速入口？" style={{fontWeight:"bolder"}} key="1">
                            {access}
                        </Panel>
                        <Panel header="Q:&nbsp;&nbsp;&nbsp;登录成功后您看到的是首页展示！" style={{fontWeight:"bolder"}}  key="2">
                            {index}
                        </Panel>
                        <Panel header="Q:&nbsp;&nbsp;&nbsp;如何新建报告？" style={{fontWeight:"bolder"}}  key="4">
                            {newly}
                        </Panel>
                        <Panel header="Q:&nbsp;&nbsp;&nbsp;管理员如何添加用户？" style={{fontWeight:"bolder"}}  key="3">
                            {user}
                        </Panel>
                        
                        <Panel header="Q:&nbsp;&nbsp;&nbsp;不同的职位分别能操作什么事情？" style={{fontWeight:"bolder"}} key="5">
                            {position}
                        </Panel>
                    </Collapse>
                </Card>
                <BackTop />
            </PageHeaderWrapper>

        )
    }
}

export default UserManual;