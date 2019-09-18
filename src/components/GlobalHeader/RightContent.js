import { Button, Dropdown, Icon, Menu, Spin, Tag, message } from 'antd';
import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import NoticeIcon from '../NoticeIcon';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import { connect } from 'dva';
import CountDown from '@/components/CountDown';

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
      timer: 3000,
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

  onItemClick = (item, tabProps) => {
    console.log(item, tabProps);
  }

  // handleNoticeClear = type => {
  //   const { data } = this.state;
  //   message.success(`${type}`);
  //   this.setState({
  //     data:[]
  //   })
  // };

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
      timer: 3000,
    })
    //this.getNotifyOrEvent();
  }

  render() {
    const { data , timer} = this.state;
    console.log(data)
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
    //display:'none'
    return (
      <div className={className}>
        <CountDown style={{ fontSize: 20, }} target={targetTime} onEnd={this.handleEnd} />
        <NoticeIcon
          className="notice-icon"
          count={data.length}
          onItemClick={this.onItemClick}
          onClear={this.fetchMore}
          style={{ marginRight: 30 }}
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
