import { Button, Dropdown, Icon, Menu, Spin } from 'antd';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import styles from './index.less';

const MenuItem = Menu.Item;

export default class GlobalHeaderRight extends PureComponent {

  render() {
    const {
      onMenuClick,
      theme,
      account
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <MenuItem key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.info" defaultMessage="system info" />
        </MenuItem>
        <Menu.Divider />
        <MenuItem key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </MenuItem>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {account ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Button type="link" icon="caret-down" className={styles.name}>{account}</Button>
            </span>
          </Dropdown>
        ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
      </div>
    );
  }
}
