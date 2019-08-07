// auth的值参考 /common/auth.js列表
import React from 'react';
import store from '../../index';

export function checkAuth({ id }) {
  const { currentAuthority, userMenu } = store.getState().login;

  // 管理员直接跳过检查
  if (['super', 'admin'].includes(currentAuthority)) {
    return true;
  }
  const authorized = userMenu.findIndex(item => item.id === id);
  return authorized !== -1;
}

export default function AuthController(props) {
  const { children } = props;
  return  <React.Fragment>{children}</React.Fragment>;
}
