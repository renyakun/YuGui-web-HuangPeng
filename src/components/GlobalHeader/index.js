import React, { PureComponent } from 'react';
import { Icon ,Button} from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import logo_home from '@/assets/logo_home.png';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo_home} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <div className={styles.nav}>
          <p>快速入口：</p>
          <Link to="/" ><Button type="link">我的工作台</Button></Link> 
          <Link to="/report" ><Button type="link">新建报告</Button></Link> 
          <Link to="/search" ><Button type="link">搜索报告</Button></Link> 
          <Link to="/system/info" ><Button type="link">个人信息</Button></Link> 
          <Link to="/company" ><Button type="link">公司信息</Button></Link> 
        </div>
        <RightContent {...this.props} />
      </div>
    );
  }
}
