import request from '@/utils/request';
import { stringify } from 'qs';

export async function getSearchReport(params) {
  return request(`/report/list?${stringify(params)}`);
}


export async function getUserRealName() {
  return request(`/report/getUserRealName`);
}