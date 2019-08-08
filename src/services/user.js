import { stringify } from "qs";
import request from '@/utils/request';

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
