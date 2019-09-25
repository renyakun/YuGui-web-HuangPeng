import request from '@/utils/request';
import { stringify } from 'qs';

export async function getUserNotifyInfo() {
  return request(`/report/getUserNotifyInfo`);
}

export async function getPassRate() {
  return request(`/report/getPassRate`);
}

export async function getTodayNotify() {
  return request(`/report/getTodayNotify`);
}

export async function getNewReportNotify() {
  return request(`/report/getReportNotify`);
}

export async function getNotifyOrEvent() {
  return request(`/report/getNotifyOrEvent`);
}

export async function getdeleteNotifyOrEvent(params) {
  return request(`/report/deleteNotifyOrEvent`, {
    method: "POST",
    body: params,
  });
}

export async function getWaitCheckList(params) {
  return request(`/report/getWaitCheckList?${stringify(params)}`);
}

export async function getWaitApproveList(params) {
  return request(`/report/getWaitApproveList?${stringify(params)}`);
}

export async function getUserInfo() {
    return request(`/report/user/getuser`);
}

export async function getAddUser(params) {
  return request(`/report/user/addUser`, {
    method: "POST",
    body: params,
  });
}

export async function getUpdateUser(params) {
  return request(`/report/user/updateUser`, {
    method: "POST",
    body: params,
  });
}

export async function getDeleteUser(params) {
  return request(`/report/user/deleteUser`, {
    method: "POST",
    body: params,
  });
}

export async function getUserList(params) {
  return request(`/report/user/list?${stringify(params)}`);
}