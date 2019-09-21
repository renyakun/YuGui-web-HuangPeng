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

export async function updateReport(params) {
  return request(`/report/updateReport`, {
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

export async function getNewReportList(params) {
  return request(`/report/getNewReportList?${stringify(params)}`);
}

export async function getApproveUserList() {
  return request(`/report/getApproveUserList`);
}
export async function getCheckedReportList(params) {
  return request(`/report/getCheckedReportList?${stringify(params)}`);
}

export async function getCheckUserList() {
  return request(`/report/getCheckUserList`);
}

export async function getApproveReportList(params) {
  return request(`/report/getApproveReportList?${stringify(params)}`);
}

export async function getFileReportList(params) {
  return request(`/report/getFileReportList?${stringify(params)}`);
}

export async function getcreateReportNumber() {
  return request(`/report/createReportNumber`);
}

export async function getcompanyInfo() {
  return request(`/report/companyInfo`);
}

export async function getautoCheck(params) {
  return request(`/report/autoCheck`, {
    method: "POST",
    body: params,
  });
}

export async function getSignature() {
  return request(`/report/user/getSignature`);
}

 