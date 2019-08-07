// import request from '@/utils/request';

// export async function query() {
//   return request('/api/users');
// }

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }




import raxios from '../utils/raxios';

export async function logout() {
  return raxios.get('/logout');
}

export async function login(params) {
  return raxios.post('/login', params);
}

// export async function checkLogin() {
//   // 设置5秒超时
//   return raxios.get('/login', {
//     timeout: 5000,
//   });
// }




