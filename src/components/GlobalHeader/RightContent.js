import { Button, Dropdown, Icon, Menu, Spin, Tooltip, message } from 'antd';
import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import NoticeIcon from '../NoticeIcon';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import { connect } from 'dva';
import CountDown from '@/components/CountDown';
import Link from 'umi/link';

const NoticeIconTab = NoticeIcon.Tab;

@connect(({ userseting: { NotifyEvt }, loading }) => ({
  NotifyEvt,
  loading: loading.models.userseting,
}))
class GlobalHeaderRight extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timer: 5500,
    }
  }

  componentDidMount() {
    this.getNotifyOrEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.NotifyEvt != this.props.NotifyEvt) {
      this.setState({
        data: nextProps.NotifyEvt,
      });
    }
  }

  getNotifyOrEvent() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchNotifyOrEvent',
    });
  }


  DeleteNotifyOrEvent(id) {
    const ids = [];
    ids.push(id);
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/DeleteNotifyOrEvent',
      payload: { ids },
    });
  }

  onItemClick = (item, tabProps) => {
    const { data } = this.state;
    data.splice(data.findIndex(item => item.id === item.id), 1);
    const dataList = data;
    this.setState({ data: dataList })
    this.DeleteNotifyOrEvent(item.id);
    if (item.operationType == 'event') {
      const { dispatch } = this.props;
      if (item.message.search("审批") != -1) {
        setTimeout(() => {
          //message.success("自动提交审批详情", 1);
          message.success("自动跳转", 1);
          dispatch(
            routerRedux.push({
              // pathname: '/workplatform/detailwaitApprove',
              // report: item.reportNo
              pathname: '/workplatform/waitapprveList',
            })
          )
        }, 1500);
      } else {
        setTimeout(() => {
          //message.success("自动提交审核详情", 1);
          message.success("自动跳转", 1);
          dispatch(
            routerRedux.push({
              // pathname: '/workplatform/detailwaitCheck',
              // report: item.reportNo
              pathname: '/workplatform/waitcheckList',
            })
          )
        }, 1500);
      }
    }
  }

  fetchMore = () => {
    const { dispatch } = this.props;
    message.loading('加载更多', 2);
    setTimeout(() => {
      dispatch(
        routerRedux.push({
          pathname: '/',
        })
      )
    }, 2500);
  }

  getNoticeData(notices) {
    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      // if (newNotice.extra && newNotice.status) {
      //   const color = {
      //     todo: '',
      //     processing: 'blue',
      //     urgent: 'red',
      //     doing: 'gold',
      //   }[newNotice.status];
      //   newNotice.extra = (
      //     <Tag color={color} style={{ marginRight: 0 }}>
      //       {newNotice.extra}
      //     </Tag>
      //   );
      // }
      return newNotice;
    });

    return newNotices.reduce((pre, data) => {
      if (!pre[data.operationType]) {
        pre[data.operationType] = [];
      }
      pre[data.operationType].push(data);
      return pre;
    }, {});
  }

  handleEnd = () => {
    this.setState({
      timer: 5500,
    })
    this.getNotifyOrEvent();
  }

  render() {
    const { data, timer } = this.state;
    const { account, onMenuClick, theme, } = this.props;
    const noticeData = this.getNoticeData(data);
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.info" defaultMessage="system info" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    const targetTime = new Date().getTime() + timer;

    return (
      <div className={className} >
        <CountDown style={{ color: '#fff', fontSize: 1 }} target={targetTime} onEnd={this.handleEnd} />
        
        <NoticeIcon
          className="notice-icon"
          count={data.length}
          onItemClick={this.onItemClick}
          onClear={this.fetchMore}
        >
          <NoticeIconTab
            list={noticeData.notification}
            title="通知"
            emptyText="你已查看所有通知"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIconTab
            list={noticeData.event}
            title="待办"
            emptyText="你已完成所有待办"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>



        {/* <Tooltip title="使用文档" >
          <Link to={{ pathname: '/' }}><Icon type="question-circle" theme="filled" /></Link>
        </Tooltip> */}
        {account ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Button type="link" icon="caret-down" className={styles.name}>{account}</Button>
            </span>
          </Dropdown>
        ) : (
            <Spin size="small" style={{ marginRight: 30 }} />
          )}
      </div>
    );
  }

}

export default GlobalHeaderRight;
