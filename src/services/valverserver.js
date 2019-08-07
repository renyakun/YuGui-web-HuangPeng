import request from '@/utils/request';
import { stringify } from 'qs';

export async function creatValveReport(params) {
  return request(`/report/detail?${stringify(params)}`);
}

export async function getDetailValve(params) {
  return request(`/report/detail?${stringify(params)}`);
}