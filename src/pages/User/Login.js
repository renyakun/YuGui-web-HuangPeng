import Login from '@/components/Login';
import { Alert } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import { FormattedMessage } from 'umi/locale';
import md5 from '../../utils/md5';
import styles from './Login.less';


const { UserName, Password, Submit, EmpCode } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  handleSubmit = (err, values) => {
    // const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          pwd: md5(values.pwd),
        },
      });
    }
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            login.type === 'account' &&
            !login.submitting &&
            this.renderMessage(login.errMsg)}
          <UserName name="user" placeholder="请输入账号" />
          <Password name="pwd" placeholder="请输入密码" />
          <Submit loading={submitting}><FormattedMessage id="app.login.login" /></Submit>
        </Login>
      </div>
    );
  }
}







