// import Login from '@/components/Login';
// import { Alert, Card, Checkbox, Button } from 'antd';
// import { connect } from 'dva';
// import React, { Component } from 'react';
// import Link from 'umi/link';
// import { formatMessage, FormattedMessage } from 'umi/locale';
// import styles from './Login.less';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

// @connect(({ login, loading }) => ({
//   login,
//   submitting: loading.effects['login/login'],
// }))
// class LoginPage extends Component {
//   state = {
//     type: 'account',
//     autoLogin: true,
//   };

//   onTabChange = type => {
//     this.setState({ type });
//   };

//   onGetCaptcha = () =>
//     new Promise((resolve, reject) => {
//       this.loginForm.validateFields(['mobile'], {}, (err, values) => {
//         if (err) {
//           reject(err);
//         } else {
//           const { dispatch } = this.props;
//           dispatch({
//             type: 'login/getCaptcha',
//             payload: values.mobile,
//           })
//             .then(resolve)
//             .catch(reject);
//         }
//       });
//     });

//   handleSubmit = (err, values) => {
//     const { type } = this.state;
//     if (!err) {
//       const { dispatch } = this.props;
//       dispatch({
//         type: 'login/login',
//         payload: {
//           ...values,
//           type,
//         },
//       });
//     }
//   };

//   changeAutoLogin = e => {
//     this.setState({
//       autoLogin: e.target.checked,
//     });
//   };

//   renderMessage = content => (
//     <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
//   );

//   render() {
//     const { login, submitting } = this.props;
//     const { type, autoLogin } = this.state;
//     return (
//       <div className={styles.main}>
//         <Login
//           defaultActiveKey={type}
//           onTabChange={this.onTabChange}
//           onSubmit={this.handleSubmit}
//           ref={form => {
//             this.loginForm = form;
//           }}
//         >
//           <Card key="account"  style={{backgroundColor:'rgba(255,255,255,.6)'}}>
//             {login.status === 'error' &&
//               login.type === 'account' &&
//               !submitting &&
//               this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
//             <UserName name="userName" placeholder="admin/user" />
//             <Password
//               name="password"
//               placeholder="888888/123456"
//               onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
//             />
//             <Submit loading={submitting}>
//               <FormattedMessage id="app.login.login" />
//             </Submit>
//           </Card>
//           <></>
//           {/* <div className={styles.other}>
//             <Link className={styles.register} to="/User/Register">
//               <FormattedMessage id="app.login.signup" />
//             </Link>
//           </div> */}
//         </Login>
//       </div>
//     );
//   }
// }

// export default LoginPage;




import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from '@/components/Login';
import md5 from '@/utils/md5';
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
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}


