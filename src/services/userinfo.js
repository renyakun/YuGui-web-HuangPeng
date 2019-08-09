import request from '@/utils/request';
import { stringify } from 'qs';

///
export async function getUserInfo() {
    return request(`/report/user/getuser`);
}

export async function getUserNotifyInfo() {
  return request(`/report/getUserNotifyInfo`);
}

export async function getWaitCheckList() {
  return request(`/report/getWaitCheckList`);
}

export async function getWaitApproveList() {
  return request(`/report/getWaitApproveList`);
}

