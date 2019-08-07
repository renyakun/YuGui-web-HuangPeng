import { stringify } from "qs";
import request from '@/utils/request';

// export async function query() {
//   return request('/api/users');
// }

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }


// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }



// import raxios from '../utils/raxios';

// export async function logout() {
//   return raxios.get('/logout');
// }

// export async function login(params) {
//   return raxios.post('/login', params);
// }

// export async function checkLogin() {
//   // 设置5秒超时
//   return raxios.get('/login', {
//     timeout: 5000,
//   });
// }

export async function logout() {
  return request('/report/logout');
}

export async function login(params) {
  return request(`/report/user/login?${params}`, {
    method: "POST", 
    body: params,
  });
}

export async function checkLogin() {
  return request('/report/logout', {
    timeout: 5000,
  });
}
