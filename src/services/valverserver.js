import request from '@/utils/request';
import { stringify } from 'qs';

export async function creatValveReport(params) {
  return request(`/report/createValve`, {
    method: "POST",
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getDetailValve(params) {
  return request(`/report/getReportDetail?${stringify(params)}`);
}

export async function addNotifyCheckUser(params) {
  return request(`/report/addNotifyCheckUser`, {
    method: "POST",
    body: params,
  });
}

export async function addNotifyApproveUser(params) {
  return request(`/report/addNotifyApproveUser`, {
    method: "POST",
    body: params,
  });
}

export async function checkResult(params) {
  return request(`/report/checkResult`, {
    method: "POST",
    body: params,
  });
}

export async function approveResult(params) {
  return request(`/report/approveResult`, {
    method: "POST",
    body: params,
  });
}


export async function addFileReport(params) {
  return request(`/report/addFileReport`, {
    method: "POST",
    body: params,
  });
}

export async function getNewReportList() {
  return request(`/report/getNewReportList`);
}

export async function getApproveUserList() {
  return request(`/report/getApproveUserList`);
}
export async function getCheckedReportList() {
  return request(`/report/getCheckedReportList`);
}

export async function getCheckUserList() {
  return request(`/report/getCheckUserList`);
}

export async function getApproveReportList() {
  return request(`/report/getApproveReportList`);
}

export async function getFileReportList() {
  return request(`/report/getFileReportList`);
}


