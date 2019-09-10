import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCompanyList(params) {
  return request(`/report/getCompanyList?${stringify(params)}`);
}

export async function getAddCompany(params) {
  return request(`/report/addCompany`, {
    method: "POST",
    body: params,
  });
}

export async function getUpdateCompany(params) {
  return request(`/report/updateCompany`, {
    method: "POST",
    body: params,
  });
}

export async function deleteCompany(params) {
  return request(`/report/deleteCompany`, {
    method: "POST",
    body: {
      ...params,
      method: 'post',
    },
  });
}