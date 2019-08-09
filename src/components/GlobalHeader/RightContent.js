import { Button, Dropdown, Icon, Menu, Tag ,Spin} from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import styles from './index.less';


export default class GlobalHeaderRight extends PureComponent {


  render() {
    const {
      onMenuClick,
      theme,
      account
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.system.info" defaultMessage="system info" />
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
    return (
      <div className={className}>
        <Link to={{ pathname: '/searchreport/searchreportlist' }}><Button type="link" icon="search" style={{ color: 'rgba(0,0,0)' }}>查询</Button></Link>
        {account ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              {/* <Icon type="user" style={{ fontSize: '20px' }} /> */}
              <span className={styles.name}>{account}</span>
              <Icon type="caret-down" style={{ fontSize: '20px' }} />
            </span>
          </Dropdown>
        ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
      </div>
    );
  }
}
